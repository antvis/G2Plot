export type Options = {
  /** 容器 宽度 */
  readonly width: number;
  /** 容器 高度 */
  readonly height: number;
  /** 图表数据, data 像素 rgba 值 */
  readonly data: number[];
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
  /** canvas 实例 */
  public canvas: HTMLCanvasElement;

  constructor(container: string | HTMLElement, options: O) {
    this.container = typeof container === 'string' ? document.getElementById(container) : container;
    this.options = options;
    this.init();
  }

  public init(): void {
    const { width, height } = this.options;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${width}`);
    canvas.setAttribute('height', `${height}`);
    this.container.appendChild(canvas);

    this.canvas = canvas;

    this.bindEvents();
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
   * 生命周期: 销毁 canvas
   */
  public destroy() {
    if (this.canvas) {
      this.canvas.remove();
    }
  }
}
