import * as G2 from '@antv/g2';
import _ from 'lodash';
import PlotConfig, { G2Config } from '../interface/config';
import '../theme/default';

export default abstract class BasePlot<T extends PlotConfig = PlotConfig> {
  /** g2实例 */
  public _container: string | HTMLElement;
  public plot: G2.Plot;
  protected _initialProps: T;
  protected _config: G2Config;
  public eventHandlers: any[] = [];

  constructor(container: string | HTMLElement, config: T) {
    this._initialProps = config;
    this._container = container;
    this._init(container);
  }

  protected _init(container: string | HTMLElement) {
    const props = this._initialProps;
    this._config = {
      scales: {},
      legends: {
        position: 'bottom-center',
      },
      tooltip: {
        showTitle: true,
        triggerOn: 'mousemove',
        inPanel: true,
        useHtml: true,
      },
      axes: { fields: {} },
      coord: { type: 'cartesian' },
      elements: [],
      annotations: [],
      interactions:{},
      theme: this._initialProps.theme ? this._initialProps.theme : G2.getTheme('plot-global'),
    };
    this._setDefaultG2Config();
    this._coord();
    this._scale();
    this._axis();
    this._tooltip();
    this._legend();
    this._addElements();
    this._annotation();
    this._animation();
    this.plot = new G2.Plot({
      containerDOM: container,
      forceFit: true,
      padding: props.padding ? props.padding : [ 40, 20, 60, 20 ],
      data: props.data,
      theme: this._config.theme,
      options: this._config,
    });
    this._interactions();
    this._events();
  }

  /** 设置G2默认配置项 */
  protected abstract _setDefaultG2Config(): void;

  /** 配置G2 */
  protected abstract _scale(): void;
  protected abstract _axis(): void;
  protected abstract _coord(): void;
  protected abstract _annotation(): void;
  protected abstract _addElements(): void;
  protected abstract _animation(): void;
  protected abstract _interactions(): void;

  protected  _events(eventParser?): void {
    const props = this._initialProps;
    if (props.events) {
      const events = props.events;
      const eventmap = eventParser.EVENT_MAP;
      _.each(events, (e) => {
        if (_.isFunction(e)) {
          const eventName = eventmap[e.name];
          const handler = e;
          eventParser.onEvent(this, eventName, handler);
        }
      });
    }
  }

  /** plot通用配置 */
  protected _tooltip(): void {
    const props = this._initialProps;
    if (props.tooltip === false) {
      this._setConfig('tooltip', false);
      return;
    }
    this._setConfig('tooltip', {
      crosshairs: _.get(props, 'tooltip.crosshairs'),
    });
    this._setConfig('tooltip', {
      shared: _.get(props, 'tooltip.shared'),
    });
  }

  protected _legend(): void {
    const props = this._initialProps;
    this._setConfig('legends', {
      position: _.get(props, 'legend.position'),
    });
    this._setConfig('legends', {
      formatter: _.get(props, 'legend.formatter'),
    });
  }

  /** 设置G2 config，带有类型推导 */
  protected _setConfig<T extends keyof G2Config>(key: T, config: G2Config[T]): void {
    if (key === 'element') {
      this._config.elements.push(config as G2Config['element']);
      return;
    }

    if (config === false) {
      this._config[key] = false;
      return;
    }
    _.assign(this._config[key], config);
  }

  /** 修改数据 */
  public changeData(data: object[]): void {
    this.plot.changeData(data);
  }

  /** 完整生命周期渲染 */
  public render(): void {
    this.plot.render();
  }

  /** 画布内容重绘 */
  public repaint(): void {
    this.plot.get('canvas').draw();
  }

  /** 销毁 */
  public destroy(): void {
    /** TODO 清除事件 */
    _.each(this.eventHandlers, (handler) => {
      this.plot.off(handler.type, handler.handler);
    });
    const canvasDOM = this.plot.get('canvas').get('canvasDOM');
    canvasDOM.remove();
    this.plot.destroy();
  }

  /** 更新配置项 */
  public updateConfig(cfg):void {
    const newProps = _.assign(this._initialProps, cfg);
    this.destroy();
    this._initialProps = newProps;
    this._init(this._container);
    this.render();
  }

}
