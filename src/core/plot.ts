import { Chart } from '@antv/g2';
import { bind } from 'size-sensor';
import { Adaptor } from './adaptor';
import { ChartOptions, Data } from '../types';

/**
 * 所有 plot 的基类
 */
export abstract class Plot<O extends ChartOptions> {
  /** plot 类型名称 */
  public abstract type: string = 'base';
  /** plot 的 schema 配置 */
  public options: O;
  /** plot 绘制的 dom */
  public container: HTMLElement;
  /** G2 chart 实例 */
  public chart: Chart;
  /** resizer unbind  */
  private unbind: () => void;

  constructor(container: string | HTMLElement, options: O) {
    this.container = typeof container === 'string' ? document.getElementById(container) : container;
    this.options = options;

    this.createG2();
  }

  /**
   * 创建 G2 实例
   */
  private createG2() {
    const { width, height, padding, appendPadding, renderer, pixelRatio } = this.options;

    this.chart = new Chart({
      container: this.container,
      autoFit: false, // G2Plot 使用 size-sensor 进行 autoFit
      height,
      width,
      padding,
      appendPadding,
      renderer,
      localRefresh: false, // 默认关闭，目前 G 还有一些位置问题，难以排查！
      pixelRatio,
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

    // 转化成 G2 API
    adaptor({
      chart: this.chart,
      options: this.options,
    });

    this.chart.render();

    // 绑定
    this.bindSizeSensor();
  }

  /**
   * 更新配置
   * @param options
   */
  public update(options: O) {
    this.options = options;

    this.render();
  }

  /**
   * 更新数据
   * @param options
   */
  public changeData(data: Data) {
    this.chart.changeData(data);
    this.chart.render();
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
    // 取消 size-sensor 的绑定
    this.unbindSizeSensor();
    // G2 的销毁
    this.chart.destroy();
  }

  /**
   * 绑定 dom 容器大小变化的事件
   */
  private bindSizeSensor() {
    this.unbindSizeSensor();

    const { autoFit = true } = this.options;
    if (autoFit) {
      this.unbind = bind(this.container, () => {
        this.chart.forceFit();
      });
    }
  }

  /**
   * 取消绑定
   */
  private unbindSizeSensor() {
    if (this.unbind) {
      this.unbind();
      this.unbind = undefined;
    }
  }
}
