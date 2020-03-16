import { get, isNil, isArray } from '@antv/util';
import { IGroup } from '@antv/g-base';
import { registerShape } from '@antv/g2';
import { ShapeMarkerCfg, ShapePoint, ShapeInfo } from '@antv/g2/lib/interface';
import { getStyle } from '@antv/g2/lib/geometry/shape/util/get-style';

// 根据数据点生成矩形的四个关键点
function _getRectPoints(cfg, isPyramid = false) {
  const { x, y, y0, size } = cfg;
  // 有 4 种情况，
  // 1. x, y 都不是数组
  // 2. y是数组，x不是
  // 3. x是数组，y不是
  // 4. x, y 都是数组
  let yMin;
  let yMax;
  if (isArray(y)) {
    yMin = y[0];
    yMax = y[1];
  } else {
    yMin = y0;
    yMax = y;
  }

  let xMin;
  let xMax;
  if (isArray(x)) {
    xMin = x[0];
    xMax = x[1];
  } else {
    xMin = x - size / 2;
    xMax = x + size / 2;
  }

  const points = [
    { x: xMin, y: yMin },
    { x: xMin, y: yMax },
  ];

  if (isPyramid) {
    // 绘制尖底漏斗图
    // 金字塔漏斗图的关键点
    // 1
    // |   2
    // 0
    points.push({
      x: xMax,
      y: (yMax + yMin) / 2,
    });
  } else {
    // 矩形的四个关键点，结构如下（左下角顺时针连接）
    // 1 ---- 2
    // |      |
    // 0 ---- 3
    points.push({ x: xMax, y: yMax }, { x: xMax, y: yMin });
  }

  return points;
}

// 根据关键点绘制漏斗图的 path
function _getFunnelPath(cfg, compare) {
  const path = [];
  const { points, nextPoints } = cfg;

  if (compare) {
    // 对比漏斗
    const { yValues, yValuesMax, yValuesNext } = compare;
    const originY = (points[0].y + points[1].y) / 2;

    const yValueTotal = yValues[0] + yValues[1];
    const yRatios = yValues.map((yValue) => yValue / yValueTotal / 0.5);
    const yOffset = (yValuesMax[0] / (yValuesMax[0] + yValuesMax[1]) - 0.5) * 0.9;
    const spacing = 0.001;

    if (!isNil(nextPoints)) {
      const yValueTotalNext = yValuesNext[0] + yValuesNext[1];
      const yRatiosNext = yValuesNext.map((yValueNext) => yValueNext / yValueTotalNext / 0.5);
      path.push(
        ['M', points[0].x, yOffset + (points[0].y - originY) * yRatios[0] + originY - spacing],
        ['L', points[1].x, yOffset + originY - spacing],
        ['L', nextPoints[1].x, yOffset + originY - spacing],
        ['L', nextPoints[0].x, yOffset + (nextPoints[3].y - originY) * yRatiosNext[0] + originY - spacing],
        ['Z']
      );
      path.push(
        ['M', points[0].x, yOffset + originY + spacing],
        ['L', points[1].x, yOffset + (points[1].y - originY) * yRatios[1] + originY + spacing],
        ['L', nextPoints[1].x, yOffset + (nextPoints[2].y - originY) * yRatiosNext[1] + originY + spacing],
        ['L', nextPoints[0].x, yOffset + originY + spacing],
        ['Z']
      );
    } else {
      path.push(
        ['M', points[0].x, yOffset + (points[0].y - originY) * yRatios[0] + originY],
        ['L', points[1].x, yOffset + originY],
        ['L', points[2].x, yOffset + originY],
        ['L', points[3].x, yOffset + (points[3].y - originY) * yRatios[0] + originY],
        ['Z']
      );
      path.push(
        ['M', points[0].x, yOffset + 0.002 + originY],
        ['L', points[1].x, yOffset + 0.002 + (points[1].y - originY) * yRatios[1] + originY],
        ['L', points[2].x, yOffset + 0.002 + (points[2].y - originY) * yRatios[1] + originY],
        ['L', points[3].x, yOffset + 0.002 + originY],
        ['Z']
      );
    }
  } else {
    // 标准漏斗
    if (!isNil(nextPoints)) {
      path.push(
        ['M', points[0].x, points[0].y],
        ['L', points[1].x, points[1].y],
        ['L', nextPoints[1].x, nextPoints[1].y],
        ['L', nextPoints[0].x, nextPoints[0].y],
        ['Z']
      );
    } else {
      path.push(
        ['M', points[0].x, points[0].y],
        ['L', points[1].x, points[1].y],
        ['L', points[2].x, points[2].y],
        ['L', points[3].x, points[3].y],
        ['Z']
      );
    }
  }

  return path;
}

registerShape('interval', 'funnel-basic-rect', {
  getPoints(pointInfo: ShapePoint) {
    pointInfo.size = pointInfo.size * 1.8; // 调整面积
    return _getRectPoints(pointInfo);
  },
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, false, true);
    const compare = get(cfg, 'data.__compare__');
    const path = this.parsePath(_getFunnelPath(cfg, compare));

    return container.addShape('path', {
      name: 'interval',
      attrs: {
        ...style,
        path,
      },
      ['__compare__']: compare,
    });
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    const { color } = markerCfg;
    return {
      symbol: 'square',
      style: {
        r: 4,
        fill: color,
      },
    };
  },
});
