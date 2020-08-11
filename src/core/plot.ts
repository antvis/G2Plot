import { Chart, Event } from '@antv/g2';
import { deepMix } from '@antv/util';
import EE from '@antv/event-emitter';
import { bind } from 'size-sensor';
import { Adaptor } from './adaptor';
import { ChartOptions, Data, Size } from '../types';
import { getContainerSize } from '../utils';

/**
 * 所有 plot 的基类
 */
export abstract class Plot<O extends ChartOptions> extends EE {
  /** plot 类型名称 */
  public abstract readonly type: string = 'base';
  /** plot 的 schema 配置 */
  public options: O;
  /** plot 绘制的 dom */
  public readonly container: HTMLElement;
  /** G2 chart 实例 */
  public chart: Chart;
  /** resizer unbind  */
  private unbind: () => void;

  constructor(container: string | HTMLElement, options: O) {
    super();
    this.container = typeof container === 'string' ? document.getElementById(container) : container;

    this.options = deepMix({}, this.getDefaultOptions(), options);

    this.createG2();

    this.bindEvents();
  }

  /**
   * 创建 G2 实例
   */
  private createG2() {
    const { width, height, padding, appendPadding, renderer, pixelRatio, autoFit = true } = this.options;

    this.chart = new Chart({
      container: this.container,
      autoFit: false, // G2Plot 使用 size-sensor 进行 autoFit
      ...this.getChartSize(width, height, autoFit),
      padding,
      appendPadding,
      renderer,
      pixelRatio,
      localRefresh: false, // 默认关闭，目前 G 还有一些位置问题，难以排查！
    });
  }

  /**
   * 计算默认的 chart 大小。逻辑简化：如果存在 width height，则直接使用，否则使用容器大小
   * @param width
   * @param height
   * @param autoFit
   */
  private getChartSize(width: number, height: number, autoFit: boolean): Size {
    if (width && height) {
      return { width, height };
    }

    return { width, height, ...getContainerSize(this.container) };
  }

  /**
   * 绑定代理所有 G2 的事件
   */
  private bindEvents() {
    if (this.chart) {
      this.chart.on('*', (e: Event) => {
        if (e?.type) {
          this.emit(e.type, e);
        }
      });
    }
  }

  /**
   * 获取默认的 options 配置项
   * 每个组件都可以复写
   */
  protected getDefaultOptions(): Partial<O> {
    return {};
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
    // 清空已经绑定的事件
    this.off();
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
