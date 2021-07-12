import { Canvas } from '@antv/g-canvas';
import { DEFAULT_OPTIONS } from './constant';
import { getPaddingInfo } from './utils';

export type Options = {
  /** 容器 宽度 */
  readonly width: number;
  /** 容器 高度 */
  readonly height: number;
  /** 图表数据, data 像素 rgba 值 */
  readonly data: number[];
  /** 容器 内边距 */
  readonly padding: number | number[]; // 暂时不处理 auto
};

// 以左上角为原点，平移原生 canvas 画布
export type PixelBBox = {
  x: number;
  y: number;
  width: number;
  height: number;
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
  public bgCanvas: Canvas;
  /** 原生canvas，用于绘制像素图 */
  public midCanvas: HTMLCanvasElement;
  /** 用于存放 antv/components（legend、slider等） + 交互（brush、hover等）的图层 */
  public foreCanvas: Canvas;
  /** 像素图包围盒 */
  public pixelBBox: PixelBBox;

  constructor(container: string | HTMLElement, options: O) {
    this.container = typeof container === 'string' ? document.getElementById(container) : container;
    this.options = { ...DEFAULT_OPTIONS, ...options };

    this.init();
  }

  public init(): void {
    this.calculatePixelBBox();

    this.initBgCanvas();
    this.initMidCanvas();
    this.initForeCanvas();

    this.bindEvents();
  }

  /**
   * 初始化背景层：initBgCanvas
   */
  private initBgCanvas() {
    const { width, height } = this.options;
    this.container.style.position = 'relative';

    this.bgCanvas = new Canvas({
      container: this.container,
      width,
      height,
    });
    this.bgCanvas.cfg.el.id = 'bg-canvas';
  }

  /**
   * 初始化中间层：像素图 initMidCanvas
   */
  private initMidCanvas() {
    // 初始化中间层 midCanvas, 根据padding得出的 -> pixelBBox 平移和确定宽高
    const { x, y, width, height } = this.pixelBBox;

    const canvas = document.createElement('canvas');
    this.container.appendChild(canvas);

    this.midCanvas = canvas;
    this.midCanvas.id = 'mid-canvas';

    canvas.setAttribute('width', `${width}`);
    canvas.setAttribute('height', `${height}`);

    const midCanvasStyle = this.midCanvas.style;
    midCanvasStyle.position = 'absolute';
    midCanvasStyle.top = `${y}px`;
    midCanvasStyle.left = `${x}px`;
  }

  /**
   * 初始化前景层 initForeCanvas
   */
  private initForeCanvas() {
    const { width, height } = this.options;

    this.foreCanvas = new Canvas({
      container: this.container,
      width,
      height,
    });
    this.foreCanvas.cfg.el.id = 'fore-canvas';

    const foreCanvasStyle = this.foreCanvas.cfg.el.style;
    foreCanvasStyle.position = 'absolute';
    foreCanvasStyle.top = '0px';
    foreCanvasStyle.left = '0px';
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
   * 生命周期: 渲染 canvas
   */
  public abstract render();

  /**
   * 更新数据
   * @param data
   */
  public abstract changeData(data: O['data']): void;

  /**
   * 绑定事件
   */
  protected abstract bindEvents();

  /**
   * 生命周期: 销毁 container 中的所有 canvas
   */
  public destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
