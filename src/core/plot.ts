import { Options, Adaptor } from '../types';

/**
 * 所有 plot 的基类
 */
export abstract class Plot<O extends Options> {
  /** plot 类型名称 */
  public abstract type: string = 'base';
  /** plot 的 schema 配置 */
  public options: O;
  /** plot 绘制的 dom */
  public container: HTMLElement;
  public chart: any;

  constructor(container: string | HTMLElement, options: O) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.options = options;

    this.render();
  }

  /**
   * 每个组件有自己的 schema adaptor
   */
  protected abstract getSchemaAdaptator(): Adaptor;

  /**
   * 绘制
   */
  public render() {}

  /**
   * 更新配置
   * @param options
   */
  public update(options: O) {
    this.options = options;
  }

  /**
   * 修改画布大小
   * @param width
   * @param height
   */
  public changeSize(width: number, height: number) {}

  /**
   * 销毁
   */
  public destroy() {}
}
