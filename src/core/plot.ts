import { Chart, Event } from '@antv/g2';
import Element from '@antv/g2/lib/geometry/element';
import { deepMix, each, get, isFunction } from '@antv/util';
import EE from '@antv/event-emitter';
import { bind } from 'size-sensor';
import { Adaptor } from './adaptor';
import { Options, Data, StateCondition, Size } from '../types';
import { getContainerSize } from '../utils';

/** 单独 pick 出来的用于基类的类型定义 */
type PickOptions = Pick<
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
  protected getDefaultOptions(): Partial<Options> {
    return {
      renderer: 'canvas',
      tooltip: {
        shared: true,
        showCrosshairs: true,
        crosshairs: {
          type: 'x',
        },
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
   * 设置状态
   * @param type 状态类型，支持 'active' | 'inactive' | 'selected' 三种
   * @param conditions 条件，支持数组
   * @param status 是否激活，默认 true
   */
  public setState(type: 'active' | 'inactive' | 'selected', conditions: StateCondition[], status: boolean = true) {
    const elements = [];
    each(this.chart.geometries, (geom) => {
      elements.push(...geom.elements);
    });

    each(conditions, (condition) => {
      elements.forEach((ele) => {
        const origin = ele.getData();
        const { name, exp } = condition;
        if (!isFunction(exp) ? get(origin, name) === exp : exp(origin)) {
          ele.setState(type, status);
        }
      });
    });
  }

  /**
   * 获取状态
   */
  public getStates() {
    const states = [];
    each(this.chart.geometries, (geom) => {
      each(geom.elements, (ele: Element, elementIndex) => {
        const data = ele.getData();
        const model = ele.getModel();
        each(ele.getStates(), (stateName) => {
          states.push({ data, model, stateName, elementIndex });
        });
      });
    });

    return states;
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
