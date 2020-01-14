/**
 * Create By Bruce Too
 * On 2019-12-25
 */
import { LayerConfig } from '../..';
import * as _ from '@antv/util';
import Layer from '../../base/layer';
import WordCloudTooltips from './word-cloud-tooltips';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const WordCloud = require('./wordcloud2.js');

export type CloudShape =
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
export type Dimension = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type MaskImage = {
  maskImageCanvas: HTMLCanvasElement;
  maskImageContext: CanvasRenderingContext2D;
};

export type WordCloudData = {
  word: string;
  weight: number;
  id: number; // index in data array. treat as unique id
  color?: string; // cloud's color
};

/**
 * Inner start function, refresh canvas immediately(no any delay draw all 'cloud'
 * nearly at same time) with specific id
 */
export type InnerStartFunction = (hoveredId: number) => void;

export interface WordCloudViewConfig {
  data: Array<WordCloudData> | Function;
  // mask image, black-white pixel image will be better
  maskImage?: string;
  fontFamily?: string;
  // normal, lighter, bold, bolder, 100~900
  fontWeight?: string | ((word: string, weight: number) => string);
  color?: string | ((word: string, weight: number) => string);

  // font's max and min size(determine by cloud's weight)
  minFontSize?: number;
  maxFontSize?: number;

  // clear before start
  clearCanvas?: boolean;
  backgroundColor?: string;

  gridSize?: number;
  drawOutOfBound?: boolean;
  // scale 1/4 font weight each time till fit in
  shrinkToFit?: boolean;
  // reset cloud's [x,y]
  origin?: [number, number];

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

  // hover interaction item id
  enableEmphasis?: boolean;
  enableToolTips?: boolean;
  hoveredId?: number;
  shadowColor?: string;
  shadowBlur?: number;

  shape?: CloudShape | Function;
  // shape's ellipticity [0,1]
  ellipticity?: number;

  classes?: (word: string, weight: number) => string;

  hover?: (item: WordCloudData, dimension: Dimension, evt: MouseEvent, start: InnerStartFunction) => {};
  click?: (item: WordCloudData, dimension: Dimension, evt: MouseEvent) => {};

  // ONLY FOR DEBUG, DON'T USE US
  // drawMask?: boolean;
  // maskColor?: string;
  // maskGapWidth?: number;
}

interface WordCloudLayerConfig extends WordCloudViewConfig, LayerConfig {}

export default class WordCloudLayer extends Layer<WordCloudLayerConfig> {
  private _targetCanvas: HTMLCanvasElement;
  private _toolTips: WordCloudTooltips;
  private readonly _configHoverAction: Function;
  private readonly _enableToolTips: boolean;

  constructor(props: WordCloudLayerConfig) {
    super(props);
    this._configHoverAction = props.hover;
    this._enableToolTips = props.enableToolTips;
    this.options = _.deepMix(
      {},
      {
        width: 400,
        height: 400,
        enableToolTips: true,
      },
      props,
      // replace use config's hover action if needed, and trigger later
      {
        hover: this._enableToolTips ? this._toolTipsAction : this._configHoverAction,
      }
    );
  }

  public init() {
    super.init();
    this._initToolTips();
    this._render();
  }

  private _toolTipsAction = (item: WordCloudData, dimension: Dimension, evt: MouseEvent, start: InnerStartFunction) => {
    if (dimension) {
      this._toolTips.setContent('', [
        // @ts-ignore
        {
          color: item.color || 'red',
          name: item.word,
          value: item.weight,
        },
      ]);
      // @ts-ignore
      // NOTE evt.layerX is relative x in canvas, absolute x is dimension.x
      this._toolTips.setPosition(evt.layerX, evt.layerY);
      this._toolTips.show();
    } else {
      this._toolTips.hide();
    }
    this._configHoverAction(item, dimension, evt, start);
  };

  private _initToolTips() {
    this._toolTips = new WordCloudTooltips({
      showTitle: false,
      visible: true,
      canvas: this.canvas,
      follow: true,
      inPanel: false, // must be false
    });
  }

  private _render() {
    this._targetCanvas = this.canvas.get('el');
    if (this.options.maskImage) {
      this._handleMaskImage();
    } else {
      // mask image not exist
      this._start();
    }
  }

  private _handleMaskImage() {
    const image = new Image();
    image.src = this.options.maskImage;
    image.crossOrigin = 'Anonymous';
    image.onload = () => {
      if (image.naturalHeight + image.naturalWidth === 0 || image.width + image.height === 0) {
        this._start();
      } else {
        // handle no-zero image silhouette
        this._startWithMaskImage(image);
      }
    };
    image.onerror = () => {
      console.error('image %s load failed !!!', this.options.maskImage);
      // load image error, ignore this mask
      this._start();
    };
  }

  private _start() {
    WordCloud(this._targetCanvas, this.options);
  }

  private _startWithMaskImage(image: HTMLImageElement) {
    const { maskImageCanvas, maskImageContext } = this._scaleMaskImageCanvas(this._transformWhite2BlackPixels(image));
    /* Determine bgPixel by creating
     another canvas and fill the specified background color. */
    const bctx = document.createElement('canvas').getContext('2d');

    bctx.fillStyle = this.options.backgroundColor || '#fff';
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
    this.options = _.deepMix({}, this.options, { clearCanvas: false });

    this._start();
  }

  private _scaleMaskImageCanvas(maskImageCanvas: HTMLCanvasElement): MaskImage {
    const maskCanvasScaled = document.createElement('canvas');
    maskCanvasScaled.width = this.options.width;
    maskCanvasScaled.height = this.options.height;
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
