import { Canvas } from '@antv/g-canvas';
import { deepMix } from '@antv/util';
import { DEFAULT_OPTIONS } from './constant';
import { getPaddingInfo, setCanvasPosition } from './util/canvas';
import { PixelBBox, Meta } from './type';

export type Options = {
  /** 容器 宽度 */
  readonly width: number;
  /** 容器 高度 */
  readonly height: number;
  /** 容器 内边距 */
  readonly padding?: number | number[]; // 暂时不处理 auto
  /** 原始数据 */
  rawData: Record<string, any>[];
  /** 像素数据，后期内置 */
  pixelData: number[];
};

/**
 * 基于原生 canvas 绘制的 plot
 */
export abstract class CanvasPlot<O extends Options> {
  public readonly type = 'canvas-plot';
  /** plot 的 schema 配置 */
  public options: O;
  /** plot 绘制的 dom */
  public readonly container: HTMLElement;
  /** 用于存放 antv/components 的图层：如 axes、grid、背景 */
  public backgroundCanvas: Canvas;
  /** 原生canvas，用于绘制像素图 */
  public middleCanvas: HTMLCanvasElement;
  /** 用于存放 antv/components（legend、slider等） + 交互（brush、hover等）的图层 */
  public foregroundCanvas: Canvas;
  /** 像素图包围盒 */
  public pixelBBox: PixelBBox;

  constructor(container: string | HTMLElement, options: O) {
    this.container = typeof container === 'string' ? document.getElementById(container) : container;
    this.options = deepMix({}, DEFAULT_OPTIONS, options);

    this.init();
  }

  protected init() {
    this.calculatePixelBBox();

    this.initBgCanvas();
    this.initMidCanvas();
    this.initFgCanvas();

    this.bindEvents();
  }
  /**
   * 初始化背景层：initBgCanvas
   */
  private initBgCanvas() {
    const { width, height } = this.options;
    this.container.style.position = 'relative';

    this.backgroundCanvas = new Canvas({
      container: this.container,
      width,
      height,
    });
    this.backgroundCanvas.get('el').id = 'bg-canvas';
  }

  /**
   * 初始化中间层：像素图 initMidCanvas
   */
  private initMidCanvas() {
    // 初始化中间层 midCanvas, 根据padding得出的 -> pixelBBox 平移和确定宽高
    const { x, y, width, height } = this.pixelBBox;

    const canvas = document.createElement('canvas');
    canvas.id = 'mid-canvas';
    canvas.setAttribute('width', `${width}`);
    canvas.setAttribute('height', `${height}`);

    setCanvasPosition(canvas, x, y);

    this.container.appendChild(canvas);

    this.middleCanvas = canvas;
  }

  /**
   * 初始化前景层 initForeCanvas
   */
  private initFgCanvas() {
    const { width, height } = this.options;

    this.foregroundCanvas = new Canvas({
      container: this.container,
      width,
      height,
    });
    this.foregroundCanvas.get('el').id = 'fg-canvas';

    const fgCanvas = this.foregroundCanvas.get('el');
    setCanvasPosition(fgCanvas, 0, 0);
  }

  /**
   * 计算 pixelBBox
   */
  private calculatePixelBBox() {
    const { padding, width, height } = this.options;
    const paddingInfo = getPaddingInfo(padding);

    this.pixelBBox = {
      x: paddingInfo.left,
      y: paddingInfo.top,
      width: width - (paddingInfo.left + paddingInfo.right),
      height: height - (paddingInfo.top + paddingInfo.bottom),
    };
  }

  /**
   * 初始化组件
   */
  protected abstract initComponents();

  /**
   * 生命周期: 渲染 canvas
   */
  public abstract render();

  /**
   * 更新数据
   * @param data
   */
  public abstract changeData(data: O['rawData']): void;

  /**
   * 绑定事件
   */
  protected abstract bindEvents();

  /**
   * 清空画布
   */
  public abstract clear();

  /**
   * 生命周期: 销毁 container 中的所有 canvas
   */
  public destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
