import { registerElement, Element } from '@antv/g2';
import * as _ from '@antv/util';
import * as colorUtil from '../../util/color';

const GAUSS_COEF = 0.3989422804014327;
const ZERO = 1.0 / 255.0 / 16.0;

const ORIGIN_FIELD = '_origin';
const SHADOW_CANVAS = 'shadowCanvas';
const VALUE_RANGE = 'valueRange';
const IMAGE_SHAPE = 'imageShape';
const MAPPED_DATA = 'mappedData';
const GRAY_SCALE_BLURRED_CANVAS = 'grayScaleBlurredCanvas';
const HEATMAP_SIZE = 'heatmapSize';

class LinearHeatmap extends Element {
    constructor(cfg) {
        super({
          type: 'linearHeatmap',
          shapeType :'point',
          paletteCache : {},
          ...cfg,
        });
      }
    
      _prepareRange() {
        const data = this.get(MAPPED_DATA);
        const colorAttr = this.getAttr('color');
        const colorField = colorAttr.scales[0].field;
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
    
        const range = [ min, max ];
        this.set(VALUE_RANGE, range);
      }
    
      _prepareSize() {
        let radius;
        if(this.get('radius')){
            radius = this.get('radius');
        }else{
            radius = this.getDefaultValue('size');
            if (!_.isNumber(radius)) {
              radius = this.getDefaultSize();
            }
        }

        const styleOptions = this.get('styleOptions');
        let blur = styleOptions && _.isObject(styleOptions.cfg) ? styleOptions.cfg.blur : null;
        if (!_.isFinite(blur) || blur === null) {
          blur = radius / 2;
        }
        this.set(HEATMAP_SIZE, {
          blur,
          radius,
        });
      }
    
      getDefaultSize() {
        const position = this.getAttr('position');
        const coord = this.get('coord');
        const radius = Math.min(
              coord.width / (position.scales[0].ticks.length * 4),
              coord.height / (position.scales[1].ticks.length * 4),
            );
        return radius;
      }
    
      _colorize(img) {
        const colorAttr = this.getAttr('color');
        const pixels = img.data;
        const paletteCache = this.get('paletteCache');
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
    
      _prepareGreyScaleBlurredCircle(r) {
        let circleCanvas = this.get(GRAY_SCALE_BLURRED_CANVAS);
        if (!circleCanvas) {
          circleCanvas = document.createElement('canvas');
          this.set(GRAY_SCALE_BLURRED_CANVAS, circleCanvas);
        }
        const intensity = this.get('intensity')? this.get('intensity') : 2;
        const circleRadius = Math.sqrt(-2.0 * Math.log(ZERO / r / intensity / GAUSS_COEF)) / 3.0 * r;
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
    
      _drawGrayScaleBlurredCircle(x, y, r, alpha, ctx) {
        const circleCanvas = this.get(GRAY_SCALE_BLURRED_CANVAS);
        ctx.globalAlpha = alpha;
        ctx.drawImage(circleCanvas, x - r, y - r);
      }
    
      _getShadowCanvasCtx() {
        let canvas = this.get(SHADOW_CANVAS);
        if (!canvas) {
          canvas = document.createElement('canvas');
          this.set(SHADOW_CANVAS, canvas);
        }
        const viewRange = this.get('view').get('panelRange');
        canvas.width = viewRange.width;
        canvas.height = viewRange.height;
        const context = canvas.getContext('2d');
        context.globalCompositeOperation = 'lighter';
        return context;
      }
    
      _clearShadowCanvasCtx() {
        const ctx = this._getShadowCanvasCtx();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }
    
      _getImageShape() {
        let imageShape = this.get(IMAGE_SHAPE);
        if (imageShape) {
          return imageShape;
        }
        const container = this.get('container');
        imageShape = container.addShape('Image', {});
        this.set(IMAGE_SHAPE, imageShape);
        return imageShape;
      }
    
      clear() {
        this._clearShadowCanvasCtx();
        super.clear();
      }
    
      drawWithRange(range) {
            // canvas size
        const { start, end, width, height } = this.get('coord');
    
            // value, range, etc
            // const valueField = this.getAttr('color').field;
        const valueField = this.getAttr('color').scales[0].field;
        const size = this.get(HEATMAP_SIZE);
    
            // prepare shadow canvas context
        this._clearShadowCanvasCtx();
        const ctx = this._getShadowCanvasCtx();
            // filter data
        let data = this.get(MAPPED_DATA);
        if (range) {
          data = data.filter((row) => {
            return row[ORIGIN_FIELD][valueField] <= range[1] && row[ORIGIN_FIELD][valueField] >= range[0];
          });
        }
    
            // step1. draw points with shadow
        const scale = this.get('scales')[valueField];
        for (let i = 0; i < data.length; i++) {
          const obj = data[i];
          const cfg = this.getDrawCfg(obj);
          const alpha = scale.scale(obj[ORIGIN_FIELD][valueField]);
              // @ts-ignore
          this._drawGrayScaleBlurredCircle(cfg.x - start.x, cfg.y - end.y, size.radius + size.blur, alpha, ctx);
        }
    
            // step2. convert pixels
        const colored = ctx.getImageData(0, 0, width, height);
        this._clearShadowCanvasCtx();
        this._colorize(colored);
        ctx.putImageData(colored, 0, 0);
        const image = new Image();
        image.src = ctx.canvas.toDataURL('image/png');
        const imageShape = this._getImageShape();
        imageShape.attr({
          x: start.x,
          y: end.y,
          width,
          height,
          img: image,
        });
      }
    
      draw(data) {
        this.set(MAPPED_DATA, data);
    
        this._prepareRange();
        this._prepareSize();
    
        const size = this.get(HEATMAP_SIZE);
        this._prepareGreyScaleBlurredCircle(size.radius);
    
        const range = this.get(VALUE_RANGE);
        this.drawWithRange(range);
      }

}

registerElement('linearHeatmap',  LinearHeatmap);
