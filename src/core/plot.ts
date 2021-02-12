import { Chart, Event, Element } from '@antv/g2';
import { each } from '@antv/util';
import EE from '@antv/event-emitter';
import { bind } from 'size-sensor';
import { Options, StateName, StateCondition, Size, StateObject } from '../types';
import { getContainerSize, getAllElements, deepAssign, pick } from '../utils';
import { Adaptor } from './adaptor';

/** 单独 pick 出来的用于基类的类型定义 */
export type PickOptions = Pick<
  Options,
  | 'width'
  | 'height'
  | 'padding'
  | 'appendPadding'
  | 'renderer'
  | 'pixelRatio'
  | 'autoFit'
  | 'syncViewPadding'
  | 'supportCSSTransform'
  | 'limitInPlot'
>;

const SOURCE_ATTRIBUTE_NAME = 'data-chart-source-type';

/** plot 图表容器的配置 */
export const PLOT_CONTAINER_OPTIONS = [
  'padding',
  'appendPadding',
  'renderer',
  'pixelRatio',
  'syncViewPadding',
  'supportCSSTransform',
  'limitInPlot',
];

/**
 * 所有 plot 的基类
 */
export abstract class Plot<O extends PickOptions> extends EE {
  /**
   * 获取默认的 options 配置项
   * 每个组件都可以复写
   */
  static getDefaultOptions(): any {
    return {
      renderer: 'canvas',
      xAxis: {
        nice: true,
        label: {
          autoRotate: false,
          autoHide: { type: 'equidistance', cfg: { minGap: 6 } },
        },
      },
      yAxis: {
        nice: true,
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      animation: true,
    };
  }

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

    this.options = deepAssign({}, this.getDefaultOptions(), options);

    this.createG2();

    this.bindEvents();
  }

  /**
   * 创建 G2 实例
   */
  private createG2() {
    const { width, height } = this.options;

    this.chart = new Chart({
      container: this.container,
      autoFit: false, // G2Plot 使用 size-sensor 进行 autoFit
      ...this.getChartSize(width, height),
      localRefresh: false, // 默认关闭，目前 G 还有一些位置问题，难以排查！
      ...pick(this.options, PLOT_CONTAINER_OPTIONS),
    });

    // 给容器增加标识，知道图表的来源区别于 G2
    this.container.setAttribute(SOURCE_ATTRIBUTE_NAME, 'G2Plot');
  }

  /**
   * 计算默认的 chart 大小。逻辑简化：如果存在 width 或 height，则直接使用，否则使用容器大小
   * @param width
   * @param height
   */
  private getChartSize(width: number, height: number): Size {
    const chartSize = getContainerSize(this.container);
    return { width: width || chartSize.width || 400, height: height || chartSize.height || 400 };
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
  protected getDefaultOptions(): any {
    return Plot.getDefaultOptions();
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
    // 因为子 view 会继承父 view 的 options 配置（包括 legend，所以会导致 legend 重复创建）
    // 所以这里给 chart 实例的 options 配置清空
    // 最好的解法是在 G2 view.clear 方法的时候，重置 options 配置。或者提供方法去 resetOptions
    // #1684 理论上在多 view 图形上，只要存在 custom legend，都存在类似问题（子弹图、双轴图）
    // @ts-ignore
    this.chart.options = {
      data: [],
      animate: true,
    };
    this.chart.views = []; // 删除已有的 views
    // 执行 adaptor
    this.execAdaptor();
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
    this.options = deepAssign({}, this.options, options);
  }

  /**
   * 设置状态
   * @param type 状态类型，支持 'active' | 'inactive' | 'selected' 三种
   * @param conditions 条件，支持数组
   * @param status 是否激活，默认 true
   */
  public setState(type: StateName, condition: StateCondition, status: boolean = true) {
    const elements = getAllElements(this.chart);

    each(elements, (ele: Element) => {
      if (condition(ele.getData())) {
        ele.setState(type, status);
      }
    });
  }

  /**
   * 获取状态
   */
  public getStates(): StateObject[] {
    const elements = getAllElements(this.chart);

    const stateObjects: StateObject[] = [];
    each(elements, (element: Element) => {
      const data = element.getData();
      const states = element.getStates();
      each(states, (state) => {
        stateObjects.push({ data, state, geometry: element.geometry, element });
      });
    });

    return stateObjects;
  }

  /**
   * 更新数据
   * @override
   * @param options
   */
  public changeData(data: any) {
    // @ts-ignore
    this.update({ data });
    // TODO: 临时方案，最好使用下面的方式去更新数据
    // this.chart.changeData(data);
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

    this.container.removeAttribute(SOURCE_ATTRIBUTE_NAME);
  }

  /**
   * 执行 adaptor 操作
   */
  protected execAdaptor() {
    const adaptor = this.getSchemaAdaptor();

    const { padding, appendPadding } = this.options;
    // 更新 padding
    this.chart.padding = padding;
    // 更新 appendPadding
    this.chart.appendPadding = appendPadding;

    // 转化成 G2 API
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
        const { width, height } = getContainerSize(this.container);

        // 主要是防止绑定的时候触发 resize 回调
        if (width !== this.chart.width || height !== this.chart.height) {
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
