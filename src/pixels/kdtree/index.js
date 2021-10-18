/**
 * @typedef {{
 *  domain(): [number, number],
 *  range(): [number, number],
 *  inverse(pixelLevelData: number): number,
 *  (dataLevelData: number): number
 * }} Scale domain：获取定义域；range：获取值域；inverse：从像素空间变换至数据空间；直接调用：从数据空间变换至像素空间
 * @typedef {{type: 'brush-box', lowX: number, lowY: number, highX: number, highY: number}} BrushFilterOption 矩形筛选模式。low{X,Y}：框选的最小xy；high{X,Y}：框选的最大xy
 * @typedef {{type: 'brush-x', lowX: number, highX: number}} BrushXFilterOption 一维x轴矩形筛选模式。lowX：框选的最小x；highX：框选的最大x
 * @typedef {{type: 'brush-y', lowY: number, highY: number}} BrushYFilterOption 一维y轴矩形筛选模式。lowY：框选的最小y；highY：框选的最大y
 * @typedef {{type: 'angular', lowX: number, lowSlope: number, highX: number, highSlope: number}} AngularFilterOption 斜率筛选模式。low{X,Slope}：框选的最小x、斜率值；high{X,Slope}：框选的最大x、斜率值
 * @typedef {{type: 'attr', field: string, values: any[]}} AttrFilterOption 属性筛选模式。field：需要筛选的字段；values：可以接受的值列表
 */

import KDTree from "./kdtree";
import { mix, brensenhamArr } from "./util";

export default class AliTVSTree {
  _kdtree;
  _raw;
  _xScale;
  _yScale;
  _xField;
  _yField;
  _slopePixelCache;

  /**
   * KDBox算法的ali业务wrapper
   * @param {any[][]} data 原始数据，第一维数组为线的集合，第二维数组为线中端点的集合。不建议传入完整数据，只需传入包含xy的字段数据即可，否则会占用较多内存。
   * @param {string} xField x坐标字段名
   * @param {string} yField y坐标字段名
   * @param {Scale} xScale x比例尺
   * @param {Scale} yScale y比例尺
   */
  constructor(data, xField, yField, xScale, yScale, pixelBBox, viewBBox) {
    this._raw = data;
    this._xField = xField;
    this._yField = yField;
    this._xScale = xScale;
    this._yScale = yScale;
    this._pixelBBox = pixelBBox;
    this._viewBBox = viewBBox;

    // use antv/scale to draw pixel lines
    // x for line: scale('2012-02-03') * pixelBBox.width + padding.left  
    // 其中： scale('2012-02-03') 得出的是归一化后的值
    const pixelLevelData = data.map((line) =>
      line.map((point) => {
        return {
          // change: 数据值 转换成 像素位置 { date: 'a', high: 23.45 }
          // x: xScale(point[xField]),
          // y: yScale(point[yField]),
          x: xScale.scale(point[xField]) * pixelBBox.width + pixelBBox.x,
          y: yScale.scale(point[yField]) * pixelBBox.height + pixelBBox.y,
        }
      })
    );
    this._kdtree = new KDTree(pixelLevelData);
  }

  /**
   * 获取距离xy最近的点位置及数据
   * @param {number} x 像素空间x坐标
   * @param {number} y 像素空间y坐标
   * @return {{
   *  position: [number, number],
   *  data: any[]
   * }} position：最近的点位置；data：最近的线原始数据
   */
  getCrossPoints(x, y) {
    const closest = this._kdtree.knn([x, y], 1)[0];
    const data = this._raw[closest.id];
    // change: add lines
    const line = data.map(point => ({
      x: this._xScale.scale(point[this._xField]) * this._pixelBBox.width + this._pixelBBox.x,
      y: this._yScale.scale(point[this._yField]) * this._pixelBBox.height + this._pixelBBox.y,
    }));
    return {
      position: { x: closest.point.x, y: closest.point.y },
      data,
      line
    };
  }

  /**
   * 获取在xy周围的n条线
   * @param {number} x 像素空间x坐标
   * @param {number} y 像素空间y坐标
   * @param {number} r 查询半径
   * @param {number} topN 取其中n条线
   * @return {{
   *  position: [number, number],
   *  data: any[][]
   * }} position：选中的中心坐标；data：选中的线数据
   */
  getHoverLines(x, y, r, topN) {
    // indices = [id1, id2, id3, ...]
    const indices = this._kdtree.rnn([x, y], r).slice(0, topN);
    // change: add data, add id
    const data = indices.map((index) => this._raw[index.id]);
    // change: add lines
    const lines = data.map((row) => {
      return row.map(point => ({
        x: this._xScale.scale(point[this._xField]) * this._pixelBBox.width + this._pixelBBox.x,
        y: this._yScale.scale(point[this._yField]) * this._pixelBBox.height + this._pixelBBox.y,
      }))
    })
    return { position: { x, y }, data, lines };
  }

  /**
   * 根据给定参数筛选出满足要求的线数据
   * @param {BrushFilterOption|BrushXFilterOption|BrushYFilterOption|AngularFilterOption|AttrFilterOption} options 筛选模式及参数
   * @param {(data: any[]) => boolean} filter 可根据需要进行后处理筛选
   * @return {any[][]} 满足要求的线数据
   */
  getPixelData(options, filter) {
    let resultData = [];
    let lines;
    switch (options.type) {
      case "brush-box": {
        const indices = this._kdtree
          .brush([options.lowX, options.lowY], [options.highX, options.highY])
          .filter((id) => {
            const line = this._raw[id].map((p) => ({
              x: this._xScale.scale(p[this._xField]) * this._pixelBBox.width + this._pixelBBox.x,
              y: this._yScale.scale(p[this._yField]) * this._pixelBBox.height + this._pixelBBox.y,
            }));
            const minX = options.lowX;
            const minY = options.lowY;
            const maxX = options.highX;
            const maxY = options.highY;
            let l = 0,
              r = line.length - 1,
              lp = 0,
              rp = r,
              mid,
              tmpY;
            while (l <= r) {
              mid = (l + r) >> 1;
              if (line[mid].x >= minX) {
                lp = mid;
                r = mid - 1;
              } else l = mid + 1;
            }

            l = 0;
            r = line.length - 1;
            while (l <= r) {
              mid = (l + r) >> 1;
              if (line[mid].x <= maxX) {
                rp = mid;
                l = mid + 1;
              } else {
                r = mid - 1;
              }
            }
            // console.log(lp, rp);
            for (let i = lp; i <= rp; i++) {
              if (line[i].y < minY || line[i].y > maxY) {
                // console.log(line[i]);
                return false;
              }
            }
            if (lp) {
              tmpY = mix(line[lp - 1], line[lp], minX).y;
              if (tmpY < minY || tmpY > maxY) {
                // console.log(tmpY);
                return false;
              }
            }
            if (rp < line.length - 1) {
              tmpY = mix(line[rp], line[rp + 1], minX).y;
              if (tmpY < minY || tmpY > maxY) {
                // console.log(tmpY);
                return false;
              }
            }
            return true;
          });
        resultData = indices.map((index) => this._raw[index]);
        break;
      }
      case "brush-x": {
        const indices = this._kdtree.brush(
          [options.lowX, -9e9],
          [options.highX, 9e9]
        );
        resultData = indices.map((index) => this._raw[index]);
        break;
      }
      case "brush-y": {
        const indices = this._kdtree
          .brush([-9e9, options.lowY], [9e9, options.highY])
          .filter((id) => {
            const line = this._raw[id].map((p) => ({
              x: this._xScale.scale(p[this._xField]) * this._pixelBBox.width + this._pixelBBox.x,
              y: this._yScale.scale(p[this._yField]) * this._pixelBBox.height + this._pixelBBox.y,
            }));
            const minX = -9e9;
            const minY = options.lowY;
            const maxX = 9e9;
            const maxY = options.highY;
            let l = 0,
              r = line.length - 1,
              lp = 0,
              rp = r,
              mid,
              tmpY;
            while (l <= r) {
              mid = (l + r) >> 1;
              if (line[mid].x >= minX) {
                lp = mid;
                r = mid - 1;
              } else l = mid + 1;
            }

            l = 0;
            r = line.length - 1;
            while (l <= r) {
              mid = (l + r) >> 1;
              if (line[mid].x <= maxX) {
                rp = mid;
                l = mid + 1;
              } else {
                r = mid - 1;
              }
            }
            // console.log(lp, rp);
            for (let i = lp; i <= rp; i++) {
              if (line[i].y < minY || line[i].y > maxY) {
                // console.log(line[i]);
                return false;
              }
            }
            if (lp) {
              tmpY = mix(line[lp - 1], line[lp], minX).y;
              if (tmpY < minY || tmpY > maxY) {
                // console.log(tmpY);
                return false;
              }
            }
            if (rp < line.length - 1) {
              tmpY = mix(line[rp], line[rp + 1], minX).y;
              if (tmpY < minY || tmpY > maxY) {
                // console.log(tmpY);
                return false;
              }
            }
            return true;
          });
        resultData = indices.map((index) => this._raw[index]);
        break;
      }
      case "angular": {
        const indices = this._kdtree
          .angular(
            [options.lowX, options.lowSlope],
            [options.highX, options.highSlope]
          )
          .filter((id) => {
            // return true;
            const line = this._raw[id].map((p) => ({
              x: this._xScale.scale(p[this._xField]) * this._pixelBBox.width + this._pixelBBox.x,
              y: this._yScale.scale(p[this._yField]) * this._pixelBBox.height + this._pixelBBox.y,
            }));
            const minX = options.lowX;
            const angMin = Math.atan(options.lowSlope);
            const maxX = options.highX;
            const angMax = Math.atan(options.highSlope);
            let l = 0,
              r = line.length - 1,
              lp = 0,
              rp = r,
              mid,
              ang; // 弧度
            if (line[l].x > maxX || line[r].x < minX) return false;
            while (l <= r) {
              mid = (l + r) >> 1;
              if (line[mid].x >= minX) {
                lp = mid;
                r = mid - 1;
              } else l = mid + 1;
            }
            l = 0;
            r = line.length - 1;
            while (l <= r) {
              mid = (l + r) >> 1;
              if (line[mid].x <= maxX) {
                rp = mid;
                l = mid + 1;
              } else {
                r = mid - 1;
              }
            }
            for (let i = lp; i < rp; i++) {
              ang = Math.atan(
                (line[i + 1].y - line[i].y) / (line[i + 1].x - line[i].x)
              );
              if (ang < angMin || ang > angMax) {
                return false;
              }
            }
            if (lp) {
              ang = Math.atan(
                (line[lp - 1].y - line[lp].y) / (line[lp - 1].x - line[lp].x)
              );
              if (ang < angMin || ang > angMax) {
                // console.log(tmpY);
                return false;
              }
            }
            if (rp < line.length - 1) {
              ang = Math.atan(
                (line[rp + 1].y - line[rp].y) / (line[rp + 1].x - line[rp].x)
              );
              if (ang < angMin || ang > angMax) {
                // console.log(tmpY);
                return false;
              }
            }
            return true;
          });
        resultData = indices.map((index) => this._raw[index]);
        break;
      }
      case "attr": {
        resultData = this._raw.filter(
          (line) =>
            !line.find(
              (point) => !options.values.includes(point[options.field])
            )
        );
        break;
      }
    }
    if (filter) {
      resultData = resultData.filter((line) => filter(line));
    }
    lines = resultData.map((row) => {
      return row.map(point => ({
        x: this._xScale.scale(point[this._xField]) * this._pixelBBox.width + this._pixelBBox.x,
        y: this._yScale.scale(point[this._yField]) * this._pixelBBox.height + this._pixelBBox.y,
      }))
    })
    return {
      resultData, 
      lines
    };
  }

  /**
   * 根据给定筛选器找到对应线数据
   * @param {(data: any[]) => boolean} filter 给定线数据判断是否为所需的线
   * @return {any[][]} 最终的筛选结果
   */
  getSelectedLines(filter) {
    let resultData = this._raw;
    if (filter) {
      resultData = resultData.filter((line) => filter(line));
    }
    return resultData;
  }

  // 这里包含了 线渲染出来的真正的位置（scale）
  buildRenderCache() {
    const width = this._viewBBox.width;
    const height = this._viewBBox.height;
    const cache = new Array(width)
      .fill()
      .map(() => new Array(height).fill().map(() => ({})));
    for (let id in this._raw) {
      const line = this._raw[id].map((p) => ({
        x: this._xScale.scale(p[this._xField]) * this._pixelBBox.width + this._pixelBBox.x,
        y: this._yScale.scale(p[this._yField]) * this._pixelBBox.height + this._pixelBBox.y,
      }));
      for (let i = 0; i < line.length - 1; i++) {
        brensenhamArr(
          [line[i], line[i + 1]],
          cache,
          id,
          (line[i + 1].y - line[i].y) / (line[i + 1].x - line[i].x)
        );
      }
    }
    this._slopePixelCache = cache;
  }

  /**
   * 渲染模块，会根据当前的数据量自动切换最快渲染模式
   * @param {HTMLCanvasElement} canvas 需要绘制的Canvas元素
   * @param {(weight: number)=>[number, number, number]} colormap 将（0，1）之间的权值映射到[Red, Green, Blue]数值（0-255）
   * @param {boolean} normalize 是否需要做归一化，如不传则不启用
   * @param {number[]} indices 需要绘制的线序号，如不传则绘制所有
   * @return {number} 返回密度图中的最大密度值
   */
  render(canvas, colormap, normalize, indices) {
    if (!indices)
      indices = Array(this._raw.length)
        .fill()
        .map((_, i) => i);
    // const totalPoint = indices.reduce((p, v) => p + this._raw[v].length, 0);
    // brensenham

    const width = this._viewBBox.width;
    const height = this._viewBBox.height;

    if (!this._slopePixelCache) {
      this.buildRenderCache();
    }

    let ids = indices;
    const fastMapping = {};
    ids.forEach((id) => (fastMapping[id] = 1));
    const bgContext = canvas.getContext("2d");

    const tempBuffer = new Float32Array(width * height).map((_, i) => {
      const row = i % height;
      const col = Math.floor(i / height);
      const pixelCache = Object.entries(this._slopePixelCache[col][row]);
      if (normalize) {
        return pixelCache.reduce(
          (p, v) => p + (fastMapping[v[0]] ? v[1] : 0),
          0
        );
      } else {
        return pixelCache.reduce(
          (p, v) => p + (fastMapping[v[0]] ? 1 : 0), 0);
      }
    });

    bgContext.fillStyle = "black";
    bgContext.globalAlpha = 1;
    bgContext.fillRect(0, 0, width, height);
    bgContext.clearRect(0, 0, width, height);
    const tempImageBuffer = new Uint8ClampedArray(width * height * 4);
    const maxWeight = Math.ceil(tempBuffer.reduce((p, v) => Math.max(p, v)));
    const colorCache = {};
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const ratio = Math.round(
          (tempBuffer[i * height + j] / maxWeight) * 10000
        );
        if (!colorCache[ratio]) {
          colorCache[ratio] = colormap(ratio / 10000);
        }
        const color = colorCache[ratio];
        tempImageBuffer.set(color, (j * width + i) * 4);
        tempImageBuffer[(j * width + i) * 4 + 3] = ratio <= 0 ? 0 : 255;
      }
    }
    // if (arguments.length >= 5 && typeof arguments[4] === "function") {
    //   // for test framework, bug in putImageData
    //   let ImageData = arguments[4];
    //   canvas.getContext = () => ({
    //     getImageData() {
    //       return { data: tempImageBuffer };
    //     },
    //   });
    // }
    const tempImageData = new ImageData(tempImageBuffer, width, height);
    bgContext.putImageData(tempImageData, 0, 0);
    return maxWeight;
  }
}
