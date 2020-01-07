/**
 * Create By Bruce Too
 * On 2019-12-25
 */
import { LayerConfig } from '../..';
import * as _ from '@antv/util';
import Layer from '../../base/layer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WordCloud = require('./wordcloud2.js');

type CloudShape =
  | 'circle'
  | 'square'
  | 'cardioid'
  | 'diamond'
  | 'triangle'
  | 'triangle-forward'
  | 'triangle-backward'
  | 'triangle-up'
  | 'triangle-down'
  | 'pentagon'
  | 'star';
type Dimension = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type MaskImage = {
  maskImageCanvas: HTMLCanvasElement;
  maskImageContext: CanvasRenderingContext2D;
};

export interface WordCloudViewConfig {
  data: Array<Array<string | number>> | Function;
  // mask image, black-white pixel image will be better
  maskImage?: string;
  fontFamily?: string;
  // normal, lighter, bold, bolder, 100~900
  fontWeight?: string | ((word: string, weight: number) => string);
  color?: string | ((word: string, weight: number) => string);
  // if fontSize less than minSize, ignore this word
  minSize?: number;
  // determine font weight
  weightFactor?: number | ((size: number) => number);
  // clear before start
  clearCanvas?: boolean;
  backgroundColor?: string;

  gridSize?: number;
  drawOutOfBound?: boolean;
  // scale 1/4 font weight each time till fit in
  shrinkToFit?: boolean;
  // reset cloud's [x,y]
  origin?: [number, number];

  drawMask?: boolean;
  maskColor?: string;
  maskGapWidth?: number;

  // wait milliseconds before next item show
  wait?: number;
  // If the call with in the loop takes more than x milliseconds (and blocks the browser), abort immediately.
  abortThreshold?: number;
  // abort callback
  abort?: () => {};

  // [min, max] ->  random by steps(each step (max - min) / steps))
  minRotation?: number;
  maxRotation?: number;
  rotationSteps?: number;

  shuffle?: boolean;
  // the ratio of rotate
  rotateRatio?: number;

  shape?: CloudShape | Function;
  ellipticity?: number;

  classes?: (word: string, weight: number) => string;

  hover?: (item: [string, number], dimension: Dimension, evt) => {};
  click?: (item: [string, number], dimension: Dimension, evt) => {};
}

interface WordCloudLayerConfig extends WordCloudViewConfig, LayerConfig {}

export default class WordCloudLayer<T extends WordCloudLayerConfig> extends Layer {
  public config: WordCloudLayerConfig;
  private _targetCanvas: HTMLCanvasElement;
  constructor(props: WordCloudLayerConfig) {
    super(props);
    this.config = _.deepMix(
      {},
      {
        width: 400,
        height: 400,
      } as LayerConfig,
      props
    );
  }

  public init() {
    super.init();
    this._targetCanvas = this.canvas.get('el');
    if (this.config.maskImage) {
      this._handleMaskImage();
    } else {
      // mask image not exist
      this._start();
    }
  }

  private _handleMaskImage() {
    const image = new Image();
    image.src = this.config.maskImage;
    image.onload = () => {
      if (image.naturalHeight + image.naturalWidth === 0 || image.width + image.height === 0) {
        this._start();
      } else {
        // handle no-zero image silhouette
        this._startWithMaskImage(image);
      }
    };
    image.onerror = () => {
      console.error('image %s load failed !!!', this.config.maskImage);
      // load image error, ignore this mask
      this._start();
    };
  }

  private _start() {
    WordCloud(this._targetCanvas, this.config);
  }

  private _startWithMaskImage(image: HTMLImageElement) {
    const { maskImageCanvas, maskImageContext } = this._scaleMaskImageCanvas(this._transformWhite2BlackPixels(image));
    /* Determine bgPixel by creating
     another canvas and fill the specified background color. */
    const bctx = document.createElement('canvas').getContext('2d');

    bctx.fillStyle = this.config.backgroundColor || '#fff';
    bctx.fillRect(0, 0, 1, 1);
    const bgPixel = bctx.getImageData(0, 0, 1, 1).data;

    const imageData = maskImageContext.getImageData(0, 0, maskImageCanvas.width, maskImageCanvas.height);
    const newImageData = maskImageContext.createImageData(imageData);
    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] > 128) {
        newImageData.data[i] = bgPixel[0];
        newImageData.data[i + 1] = bgPixel[1];
        newImageData.data[i + 2] = bgPixel[2];
        newImageData.data[i + 3] = bgPixel[3];
      } else {
        // This color must not be the same as the bgPixel.
        newImageData.data[i] = bgPixel[0];
        newImageData.data[i + 1] = bgPixel[1];
        newImageData.data[i + 2] = bgPixel[2];
        newImageData.data[i + 3] = bgPixel[3] ? bgPixel[3] - 1 : 0; // 254
      }
    }

    maskImageContext.putImageData(newImageData, 0, 0);

    const targetCtx = this._targetCanvas.getContext('2d');
    targetCtx.drawImage(maskImageCanvas, 0, 0);
    this.config = _.deepMix({}, this.config, { clearCanvas: false });

    this._start();
  }

  private _scaleMaskImageCanvas(maskImageCanvas: HTMLCanvasElement): MaskImage {
    const maskCanvasScaled = document.createElement('canvas');
    maskCanvasScaled.width = this.config.width;
    maskCanvasScaled.height = this.config.height;
    const ctx = maskCanvasScaled.getContext('2d');
    // keep scale smooth
    ctx.imageSmoothingEnabled = true;
    // ctx.mozImageSmoothingEnabled = true;
    // ctx.webkitImageSmoothingEnabled = true;
    // ctx.msImageSmoothingEnabled = true;
    ctx.drawImage(
      maskImageCanvas,
      0,
      0,
      maskImageCanvas.width,
      maskImageCanvas.height,
      0,
      0,
      maskCanvasScaled.width,
      maskCanvasScaled.height
    );
    return {
      maskImageCanvas: maskCanvasScaled,
      maskImageContext: ctx,
    };
  }

  private _transformWhite2BlackPixels(image: HTMLImageElement): HTMLCanvasElement {
    const maskImageCanvas = document.createElement('canvas');
    maskImageCanvas.width = image.width;
    maskImageCanvas.height = image.height;
    const ctx = maskImageCanvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);
    const imageData = ctx.getImageData(0, 0, maskImageCanvas.width, maskImageCanvas.height);
    const SINGLE_COMPONENT_SIZE = 4;
    const BLACK_PIXEL = 0;
    const FULL_PIXEL = 255;
    // R - G - B - A
    for (let i = 0; i < imageData.data.length; i += SINGLE_COMPONENT_SIZE) {
      const rgb = imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2];
      const alpha = imageData.data[i + 3];

      if (alpha < 128 || rgb > 250 * 3) {
        // white area(not to draw)
        imageData.data[i] = FULL_PIXEL;
        imageData.data[i + 1] = FULL_PIXEL;
        imageData.data[i + 2] = FULL_PIXEL;
        imageData.data[i + 3] = BLACK_PIXEL;
      } else {
        // black area wait to draw(image black silhouette)
        imageData.data[i] = BLACK_PIXEL;
        imageData.data[i + 1] = BLACK_PIXEL;
        imageData.data[i + 2] = BLACK_PIXEL;
        imageData.data[i + 3] = FULL_PIXEL;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return maskImageCanvas;
  }
}
