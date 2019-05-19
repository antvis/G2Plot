import * as G2 from '@antv/g2';
import _ from 'lodash';
import { Canvas } from '@antv/g';
import PlotConfig, { G2Config } from '../interface/config';
import '../theme/default';
import getAutoPadding from '../util/padding';

export default abstract class BasePlot<T extends PlotConfig = PlotConfig> {
  /** g2实例 */
  public _container: string | HTMLElement;
  public plot: G2.View;
  protected _initialProps: T;
  protected _config: G2Config;
  public eventHandlers: any[] = [];
  protected canvasCfg;

  constructor(container: string | HTMLElement, config: T) {
    this._initialProps = config;
    this._container = container;
    this.canvasCfg = this._createCanvas(container);
    this._init(container, this.canvasCfg);
    this._afterInit();
  }

  protected _init(container: string | HTMLElement, canvasCfg) {
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
    this.plot = new G2.View({
      /*containerDOM: container,
      forceFit: true,*/
      width: canvasCfg.width,
      height: canvasCfg.height,
      canvas: canvasCfg.canvas,
      container: canvasCfg.canvas.addGroup(),
      padding: this._getPadding(),
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

  protected _afterInit() {
    const props = this._initialProps;
     /** 处理autopadding逻辑 */
    if (props.padding === 'auto') {
      this.plot.render(false);
      const padding = getAutoPadding(this.plot);
      this.updateConfig({
        padding,
      });
    }
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
    this.plot.destroy();
  }

  /** 更新配置项 */
  public updateConfig(cfg):void {
    const newProps = _.assign(this._initialProps, cfg);
    this.destroy();
    this._initialProps = newProps;
    this._init(this._container, this.canvasCfg);
    this.render();
  }

  private _createCanvas(container) {
    // TODO: coord width问题
    const props = this._initialProps;
    let width = container.offsetWidth;
    let height = container.offsetHeight;
    if (props.width) width = props.width;
    if (props.height) height = props.height;

    const canvas = new Canvas({
      containerDOM: container,
      width,
      height,
      renderer: 'canvas',
      pixelRatio: 2,
    });

    return { canvas, width, height };
  }

  private _getPadding() {
    const props = this._initialProps;
    if (props.padding) {
      if (props.padding === 'auto') return [ 0, 0, 0, 0 ];
      return props.padding;
    }
    return [ 40, 20, 60, 20 ];
  }

}
