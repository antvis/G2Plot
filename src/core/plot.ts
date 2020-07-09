import { Chart } from '@antv/g2';
import { Adaptor } from './adaptor';
import { Options } from '../types';

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
  /** G2 chart 实例 */
  public chart: Chart;

  constructor(container: string | HTMLElement, options: O) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.options = options;

    this.createG2();
  }

  /**
   * 创建 G2 实例
   */
  private createG2() {
    const { width, height, padding, appendPadding } = this.options;

    this.chart = new Chart({
      container: this.container,
      autoFit: false, // G2Plot 使用 size sensor 进行 autoFit
      height,
      width,
      padding,
      appendPadding,
    });
  }

  /**
   * 每个组件有自己的 schema adaptor
   */
  protected abstract getSchemaAdaptor(): Adaptor<O>;

  /**
   * 绘制
   */
  public render() {
    // 暴力处理，先清空再渲染，需要 G2 层自行做好更新渲染
    this.chart.clear();

    const adaptor = this.getSchemaAdaptor();

    adaptor.convent(this.chart, this.options);

    this.chart.render();
  }

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
  public changeSize(width: number, height: number) {
    this.chart.changeSize(width, height);
  }

  /**
   * 销毁
   */
  public destroy() {
    this.chart.destroy();
  }
}
