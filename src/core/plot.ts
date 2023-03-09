// @ts-nocheck
import EE from '@antv/event-emitter';
import { Chart } from '@antv/g2';
import { bind } from 'size-sensor';
import { merge, omit } from '../utils';
import type { Annotation, Options, Adaptor } from '../types';

const SOURCE_ATTRIBUTE_NAME = 'data-chart-source-type';

/** new Chart options */
export const CHART_OPTIONS = ['width', 'height', 'renderer', 'autoFit', 'canvas'];

export abstract class Plot<O extends Options> extends EE {
  /** plot 类型名称 */
  public abstract readonly type: string;
  /** plot 绘制的 dom */
  public readonly container: HTMLElement;
  /** G2 Spec */
  public options: O;
  /** G2 chart 实例 */
  public chart: Chart;
  /** resizer unbind  */
  private unbind: () => void;

  constructor(container: string | HTMLElement, options: O) {
    super();
    this.container = typeof container === 'string' ? document.getElementById(container) : container;
    this.options = merge({}, this.getDefaultOptions(), options);
    this.createG2();
    this.render();
    this.bindEvents();
  }

  /**
   * new Chart 所需配置
   */
  private getChartOptions() {
    // 逻辑简化：如果存在 width 或 height，则直接使用，否则使用容器大小
    const { clientWidth = 640, clientHeight = 480 } = this.container;
    const { width = clientWidth, height = clientHeight, renderer = 'canvas', autoFit = true, canvas } = this.options;

    return {
      container: this.container,
      width,
      height,
      autoFit,
      renderer,
      canvas,
    };
  }

  /**
   * G2 options(Spec) 配置
   */
  private getSpecOptions() {
    return omit(this.options, CHART_OPTIONS);
  }

  /**
   * 创建 G2 实例
   */
  private createG2() {
    if (!this.container) {
      throw Error('The container is not initialized!');
    }
    this.chart = new Chart(this.getChartOptions());
    // 给容器增加标识，知道图表的来源区别于 G2
    this.container.setAttribute(SOURCE_ATTRIBUTE_NAME, 'G2Plot');
  }

  /**
   * 绑定代理所有 G2 的事件
   */
  private bindEvents() {
    if (this.chart) {
      this.chart.on('*', (e) => {
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
  protected getDefaultOptions(): Partial<Options> {
    return { renderer: 'canvas' };
  }

  /**
   * 绘制
   */
  public render() {
    // 暴力处理，先清空再渲染，需要 G2 层自行做好更新渲染
    this.chart.clear();
    // 执行 adaptor
    this.execAdaptor();

    // options 转换
    this.chart.options(this.getSpecOptions());
    // 渲染
    this.chart.render();
    // 绑定
    this.bindSizeSensor();
  }

  /**
   * 更新: 更新配置且重新渲染
   * @param options
   */
  public update(options: Partial<O>) {
    this.updateOption(options);
    this.render();
  }

  /**
   * 更新配置
   * @param options
   */
  protected updateOption(options: Partial<O>) {
    this.options = merge({}, this.options, options);
  }

  /**
   * 更新数据
   * @override
   * @param options
   */
  public changeData(data: any) {
    this.chart.data(data);
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
   * 增加图表标注。通过 id 标识，如果匹配到，就做更新
   */
  public addAnnotations(annotations: Annotation[]): void {}

  /**
   * 删除图表标注。通过 id 标识，如果匹配到，就做删除
   */
  public removeAnnotations(annotations: Array<{ id: string } & Partial<Annotation>>): void {}
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

    this.container.removeAttribute(SOURCE_ATTRIBUTE_NAME);
  }

  /**
   * 每个组件有自己的 schema adaptor
   */
  protected abstract getSchemaAdaptor(): (params: Adaptor<O>) => void;

  /**
   * 执行 adaptor 操作
   */
  protected execAdaptor() {
    const adaptor = this.getSchemaAdaptor();

    // 转化成 G2 Spec
    adaptor({
      chart: this.chart,
      options: this.options,
    });
  }

  /**
   * 当图表容器大小变化的时候，执行的函数
   */
  protected triggerResize() {
    this.chart.forceFit();
  }

  /**
   * 绑定 dom 容器大小变化的事件
   */
  private bindSizeSensor() {
    if (this.unbind) {
      return;
    }
    const { autoFit = true } = this.options;
    if (autoFit) {
      this.unbind = bind(this.container, () => {
        // 获取最新的宽高信息
        const { clientHeight, clientWidth } = this.container;
        const { width, height } = this.chart.options();
        // 主要是防止绑定的时候触发 resize 回调
        if (clientHeight !== width || clientWidth !== height) {
          this.triggerResize();
        }
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
