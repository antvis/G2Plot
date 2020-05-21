/**
 * Create By Bruce Too
 * On 2020-02-14
 */
import { LayerConfig } from '../..';
import { get, deepMix } from '@antv/util';
import Layer from '../../base/layer';
import WordCloudTooltips from './word-cloud-tooltips';

import WordCloud from './wordcloud2';
import { WordCloudPlotConfig } from './index';
import { TooltipCfg } from '../../dependents';

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
export type InnerStartFunction = (selected: number) => void;

export type Active = {
  shadowColor?: string;
  shadowBlur?: number;
};

export type WordStyle = {
  fontFamily?: string;
  // normal, lighter, bold, bolder, 100~900
  fontWeight?: string | ((word: string, weight: number) => string);
  color?: string | ((word: string, weight: number) => string);

  active?: Active;
  animatable?: boolean;

  // [min, max] ->  random by steps(each step (max - min) / steps))
  rotation?: [number, number];
  rotationSteps?: number;
  // the ratio of rotate
  rotateRatio?: number;

  // font's max and min size(determine by cloud's weight)
  fontSize?: [number, number];

  gridSize?: number;
  drawOutOfBound?: boolean;

  // scale 1/4 font weight each time till fit in
  // shrinkToFit?: boolean;
  // reset cloud's [x,y]
  // origin?: [number, number];
};

export interface WordCloudViewConfig extends WordCloudPlotConfig {
  data: Array<WordCloudData> | Function;
  // mask image, black-white pixel image will be better
  maskImage?: string;
  backgroundColor?: string;
  wordStyle?: WordStyle;
  shuffle?: boolean;
  selected?: number;
  tooltip?: {
    visible: boolean;
  } & TooltipCfg;
  shape?: CloudShape | Function;

  animatable?: boolean;

  onWordCloudHover?: (item: WordCloudData, dimension: Dimension, evt: MouseEvent, start: InnerStartFunction) => {};
  onWordCloudClick?: (item: WordCloudData, dimension: Dimension, evt: MouseEvent) => {};

  // clear before start
  // clearCanvas?: boolean;
  // wait milliseconds before next item show
  // wait?: number;
  // If the call with in the loop takes more than x milliseconds (and blocks the browser), abort immediately.
  // abortThreshold?: number;
  // abort callback
  // abort?: () => {};
  // shape's ellipticity [0,1]
  // ellipticity?: number;
  // ONLY FOR DEBUG, DON'T USE US
  // drawMask?: boolean;
  // maskColor?: string;
  // maskGapWidth?: number;
  // hide for now
  // classes?: (word: string, weight: number) => string;
}

interface WordCloudLayerConfig extends WordCloudViewConfig, LayerConfig {}

export default class WordCloudLayer extends Layer<WordCloudLayerConfig> {
  private _targetCanvas: HTMLCanvasElement;
  private _toolTips: WordCloudTooltips;
  private readonly _configHoverAction: Function;
  private readonly _enableToolTips: boolean;

  constructor(props: WordCloudLayerConfig) {
    super(props);
    this._configHoverAction = props.onWordCloudHover;
    this._enableToolTips = get(props, 'tooltip.visible', true);
    this.options = deepMix(
      {},
      {
        width: 400,
        height: 400,
        enableToolTips: true,
      },
      props,
      // replace use config's hover action if needed, and trigger later
      {
        onWordCloudHover: this._enableToolTips ? this._toolTipsAction : this._configHoverAction,
      }
    );
  }

  public init() {
    super.init();
    this._initToolTips();
  }

  public render() {
    super.render();
    this._render();
  }

  private _toolTipsAction = (item: WordCloudData, dimension: Dimension, evt: MouseEvent, start: InnerStartFunction) => {
    if (dimension) {
      this._toolTips.update({
        items: [
          {
            color: item.color || 'red',
            name: item.word,
            value: item.weight,
          },
        ],
        x: evt.offsetX,
        y: evt.offsetY,
      });
      this._toolTips.show();
    } else {
      this._toolTips.hide();
    }
    this._toolTips.render();
    this._configHoverAction && this._configHoverAction(item, dimension, evt, start);
  };

  private _initToolTips() {
    this._toolTips = new WordCloudTooltips({
      showTitle: false,
      visible: false,
      parent: this.options.container,
      follow: true,
      inPanel: false, // must be false
      items: [],
    });
    this._toolTips.init();
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
    image.src = this.options.maskImage + '?' + new Date().getTime();
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
    this._handleG2PlotConfig();
    const targetCtx = this._targetCanvas.getContext('2d');
    // it's a trick, because 「g」 use context to scale canvas by pixelRatio,
    // but here i need scale it back
    const pixelRatio = this.canvas.get('width') / this.canvas.get('el').width;
    targetCtx.scale(pixelRatio, pixelRatio);
    WordCloud(this._targetCanvas, this.options);
  }

  private _handleG2PlotConfig() {
    const fontSize = this.options.wordStyle.fontSize || [10, 60];
    const rotation = this.options.wordStyle.rotation || [-Math.PI / 2, Math.PI / 2];
    let active, shadowColor, shadowBlur;
    if (this.options.wordStyle.active) {
      active = true;
      shadowColor = this.options.wordStyle.active.shadowColor || '#333';
      shadowBlur = this.options.wordStyle.active.shadowBlur || 10;
    } else {
      active = false;
    }
    this.options = deepMix({}, this.options, {
      minFontSize: fontSize[0],
      maxFontSize: fontSize[1],
      minRotation: rotation[0],
      maxRotation: rotation[1],
      active,
      shadowColor,
      shadowBlur,
    });
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
        // keep this area's data the same as pixel color
        newImageData.data[i] = bgPixel[0];
        newImageData.data[i + 1] = bgPixel[1];
        newImageData.data[i + 2] = bgPixel[2];
        newImageData.data[i + 3] = bgPixel[3];
      } else {
        // This color must not be the same as the bgPixel.
        // check wordcloud2.js#1192 's condition
        newImageData.data[i] = bgPixel[0];
        newImageData.data[i + 1] = bgPixel[1];
        newImageData.data[i + 2] = bgPixel[2];
        newImageData.data[i + 3] = 254; // just for not same as the bg color
      }
    }

    maskImageContext.putImageData(newImageData, 0, 0);

    const targetCtx = this._targetCanvas.getContext('2d');
    targetCtx.drawImage(maskImageCanvas, 0, 0);
    this.options = deepMix({}, this.options, { clearCanvas: false });

    this._start();
  }

  private _scaleMaskImageCanvas(maskImageCanvas: HTMLCanvasElement): MaskImage {
    const maskCanvasScaled = document.createElement('canvas');
    // get real canvas determined by pixelRatio
    maskCanvasScaled.width = this.canvas.get('width');
    maskCanvasScaled.height = this.canvas.get('height');
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
