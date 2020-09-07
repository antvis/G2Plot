import { Chart, Event } from '@antv/g2';
import Element from '@antv/g2/lib/geometry/element';
import { deepMix, each } from '@antv/util';
import EE from '@antv/event-emitter';
import { bind } from 'size-sensor';
import { Options, StateName, StateCondition, Size, StateObject } from '../types';
import { getContainerSize, getAllElements } from '../utils';
import { Adaptor } from './adaptor';

/** 单独 pick 出来的用于基类的类型定义 */
export type PickOptions = Pick<
  Options,
  'width' | 'height' | 'padding' | 'appendPadding' | 'renderer' | 'pixelRatio' | 'autoFit'
>;

/**
 * 所有 plot 的基类
 */
export abstract class Plot<O extends PickOptions> extends EE {
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

    this.options = deepMix({}, this.getDefaultOptions(options), options);

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
   * 计算默认的 chart 大小。逻辑简化：如果存在 width 或 height，则直接使用，否则使用容器大小
   * @param width
   * @param height
   * @param autoFit
   */
  private getChartSize(width: number, height: number, autoFit: boolean): Size {
    const chartSize = getContainerSize(this.container);
    return { width: width || chartSize.width, height: height || chartSize.height };
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
  protected getDefaultOptions(options?: O): Partial<Options> {
    return {
      renderer: 'canvas',
      tooltip: {
        shared: true,
        showMarkers: false,
        offset: 20,
      },
      xAxis: {
        nice: true,
        label: {
          autoRotate: true,
          autoHide: true,
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

    const { padding } = this.options;
    // 更新 padding
    this.chart.padding = padding;

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
   * @param options
   */
  public changeData(data: any) {
    // 临时方案，会在 G2 做处理
    this.update({
      ...this.options,
      data,
    });
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
