import { registerGeometry, Geometry } from '@antv/g2';
import { Canvas } from '@antv/g-canvas';
import * as _ from '@antv/util';
import * as colorUtil from '../../util/color';

const GAUSS_COEF = 0.3989422804014327;
const ZERO = 1.0 / 255.0 / 16.0;

const ORIGIN_FIELD = '_origin';

class LinearHeatmap extends Geometry {
  public readonly type: string = 'heatmap';
  private intensity: number;
  private radius: number;
  private blur: number;
  private grayScaleCanvas: any;
  private shadowCanvas: any;
  private paletteCache: any = {};
  private imageShape: any;

  constructor(cfg) {
    super(cfg);
    this.intensity = cfg.intensity;
    this.radius = cfg.radius;
  }

  protected createElements(mappingData, isUpdate: boolean = false) {
    const range = this.prepareRange(mappingData);
    this.prepareSize();
    this.prepareBlur();
    this.prepareGreyScaleBlurredCircle(this.radius);
    this.drawWithRange(mappingData, range);
    return null;
  }

  public clear() {
    this.clearShadowCanvasCtx();
    super.clear();
  }

  private prepareRange(data) {
    const colorAttr = this.getAttribute('color');
    const colorField = colorAttr.getFields()[0];
    let min = Infinity;
    let max = -Infinity;
    data.forEach((row) => {
      const value = row[ORIGIN_FIELD][colorField];
      if (value > max) {
        max = value;
      }
      if (value < min) {
        min = value;
      }
    });
    if (min === max) {
      min = max - 1;
    }
    return [min, max];
  }

  private prepareSize() {
    let radius = this.radius;
    if (!this.radius) {
      radius = this.getDefaultValue('size');
      if (!_.isNumber(radius)) {
        radius = this.getDefaultSize();
      }
      this.radius = radius;
    }
  }

  private prepareBlur() {
    let blur = _.get(this.styleOption, ['style', 'shadowBlur']);
    if (!_.isNumber(blur)) {
      blur = this.radius / 2;
    }
    this.blur = blur;
  }

  private getDefaultSize() {
    const position = this.getAttribute('position');
    const coord = this.coordinate;
    const radius = Math.min(
      coord.getWidth() / (position.scales[0].ticks.length * 4),
      coord.getHeight() / (position.scales[1].ticks.length * 4)
    );
    return radius;
  }

  private colorize(img) {
    const colorAttr = this.getAttribute('color') as any;
    const pixels = img.data;
    const paletteCache = this.paletteCache;
    for (let i = 3; i < pixels.length; i += 4) {
      const alpha = pixels[i]; // get gradient color from opacity value
      if (alpha) {
        let palette;
        if (paletteCache[alpha]) {
          palette = paletteCache[alpha];
        } else {
          palette = colorUtil.rgb2arr(colorAttr.gradient(alpha / 256));
          paletteCache[alpha] = palette;
        }
        // const palette = colorUtil.rgb2arr(colorAttr.gradient(alpha / 256));
        pixels[i - 3] = palette[0];
        pixels[i - 2] = palette[1];
        pixels[i - 1] = palette[2];
        pixels[i] = alpha;
      }
    }
  }

  private prepareGreyScaleBlurredCircle(r) {
    let circleCanvas = this.grayScaleCanvas;
    if (!circleCanvas) {
      circleCanvas = document.createElement('canvas');
      this.grayScaleCanvas = circleCanvas;
    }
    const intensity = this.intensity ? this.intensity : 2;
    const circleRadius = (Math.sqrt(-2.0 * Math.log(ZERO / r / intensity / GAUSS_COEF)) / 3.0) * r;
    const blur = circleRadius - r;
    const r2 = circleRadius + blur;
    const ctx = circleCanvas.getContext('2d');
    circleCanvas.width = circleCanvas.height = r2 * 2;
    ctx.clearRect(0, 0, circleCanvas.width, circleCanvas.height);
    ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
    ctx.shadowBlur = blur;
    ctx.shadowColor = 'black';

    ctx.beginPath();
    ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }

  private drawGrayScaleBlurredCircle(x, y, r, alpha, ctx) {
    const circleCanvas = this.grayScaleCanvas;
    ctx.globalAlpha = alpha;
    ctx.drawImage(circleCanvas, x - r, y - r);
  }

  private getShadowCanvasCtx() {
    let canvas = this.shadowCanvas;
    if (!canvas) {
      canvas = document.createElement('canvas');
      this.shadowCanvas = canvas;
    }
    canvas.width = this.coordinate.getWidth();
    canvas.height = this.coordinate.getHeight();
    const context = canvas.getContext('2d');
    context.globalCompositeOperation = 'lighter';
    return context;
  }

  private clearShadowCanvasCtx() {
    const ctx = this.getShadowCanvasCtx();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  private getImageShape() {
    let imageShape = this.imageShape;
    if (imageShape) {
      return imageShape;
    }
    const container = this.container;
    imageShape = container.addShape({
      type: 'image',
      attrs: {},
    });
    this.imageShape = imageShape;
  }

  private drawWithRange(data, range) {
    // canvas size
    const { start, end } = this.coordinate;
    const width = this.coordinate.getWidth();
    const height = this.coordinate.getHeight();

    // value, range, etc
    const colorAttr = this.getAttribute('color');
    const valueField = colorAttr.getFields()[0];

    // prepare shadow canvas context
    this.clearShadowCanvasCtx();
    const ctx = this.getShadowCanvasCtx();
    // filter data
    if (range) {
      data = data.filter((row) => {
        return row[ORIGIN_FIELD][valueField] <= range[1] && row[ORIGIN_FIELD][valueField] >= range[0];
      });
    }

    // step1. draw points with shadow
    const scale = this.scales[valueField];
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      const cfg = this.getDrawCfg(obj);
      const alpha = scale.scale(obj[ORIGIN_FIELD][valueField]);
      // @ts-ignore
      this.drawGrayScaleBlurredCircle(cfg.x - start.x, cfg.y - end.y, this.radius + this.blur, alpha, ctx);
    }

    // step2. convert pixels
    const colored = ctx.getImageData(0, 0, width, height);
    this.clearShadowCanvasCtx();
    this.colorize(colored);
    ctx.putImageData(colored, 0, 0);
    const image = new Image();
    image.src = ctx.canvas.toDataURL('image/png');
    this.getImageShape();
    this.imageShape.attr('x', start.x);
    this.imageShape.attr('y', end.y);
    this.imageShape.attr('width', width);
    this.imageShape.attr('height', height);
    this.imageShape.attr('img', ctx.canvas);
    this.imageShape.set('origin', this.getShapeInfo(data)); // 存储绘图信息数据
  }

  private getShapeInfo(mappingData) {
    const shapeCfg = this.getDrawCfg(mappingData[0]);

    return {
      ...shapeCfg,
      mappingData,
      data: this.getData(mappingData),
    };
  }

  private getData(mappingData) {
    return mappingData.map((obj) => {
      return obj[ORIGIN_FIELD];
    });
  }
}

registerGeometry('linearHeatmap', LinearHeatmap);
