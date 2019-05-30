import * as G2 from '@antv/g2';
import * as _ from '@antv/util';
import { Canvas, Text } from '@antv/g';
import PlotConfig, { G2Config } from '../interface/config';
import getAutoPadding from '../util/padding';
import { textWrapper } from '../util/textWrapper';
import { processAxisVisible } from '../util/axis';
import Theme from '../theme';

const globalTheme = Theme.getCurrentTheme();
const G2DefaultTheme = G2.Global.theme;

export default abstract class BasePlot<T extends PlotConfig = PlotConfig> {
  /** g2实例 */
  public type: string = 'base';
  public _container: string | HTMLElement;
  public plot: G2.View;
  protected _initialProps: T;
  protected _config: G2Config;
  public eventHandlers: any[] = [];
  protected canvasCfg;
  protected paddingComponents: any[] = [];
  protected title: Text;
  protected description: Text;
  protected plotTheme: any;

  constructor(container: string | HTMLElement, config: T) {
    this._initialProps = config;
    this._container = container;
    this.canvasCfg = this._createCanvas(container);
    this._beforeInit();
    this._init(container, this.canvasCfg);
    this._afterInit();
  }

  protected _init(container: string | HTMLElement, canvasCfg) {
    const props = this._initialProps;
    this.plotTheme = this._getTheme();
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
      interactions: {},
      theme: this._getG2Theme()
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
    this._description();
    this._title();
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

  protected _events(eventParser?): void {
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
    if (props.tooltip && props.tooltip.visible === false) {
      this._setConfig('tooltip', false);
      return;
    }
    this._setConfig('tooltip', {
      crosshairs: _.get(props, 'tooltip.crosshairs'),
    });
    this._setConfig('tooltip', {
      shared: _.get(props, 'tooltip.shared'),
    });
    if (props.tooltip && props.tooltip.style) {
      _.deepMix(this._config.theme.tooltip, props.tooltip.style);
    }
  }

  protected _legend(): void {
    const props = this._initialProps;
    if (props.legend && props.legend.visible === false) {
      this._setConfig('legends', false);
      return;
    }
    this._setConfig('legends', {
      position: _.get(props, 'legend.position'),
    });
    this._setConfig('legends', {
      formatter: _.get(props, 'legend.formatter'),
    });
  }

  protected _title(): void {
    const props = this._initialProps;
    if (props.title) {
      const panelRange = this.plot.get('panelRange');
      /**如果有description的话，要根据description位置计算title位置 */
      let topMargin = 0;
      if (this.description) {
        const descriptionBBox = this.description.getBBox();
        topMargin = descriptionBBox.minY - descriptionBBox.height + this._config.theme.description.lineHeight;
      }
      const titleStyle = _.mix(this._config.theme.title, props.title.style);
      const content: string = textWrapper(props.title.text, panelRange.width, titleStyle);
      const container = this.plot.get('frontgroundGroup');
      const text = container.addShape('text', {
        attrs: _.mix({
          x: panelRange.minX,
          y: topMargin,
          text: content,
        },           titleStyle),
      });
      this.title = text;
      this._resgiterPadding(text);
    }
  }

  protected _description(): void {
    const props = this._initialProps;
    if (props.description) {
      const panelRange = this.plot.get('panelRange');
      const descriptionStyle = _.mix(this._config.theme.description, props.description.style);
      const content: string = textWrapper(props.description.text, panelRange.width, descriptionStyle);
      const container = this.plot.get('frontgroundGroup');
      const text = container.addShape('text', {
        attrs: _.mix({
          x: panelRange.minX,
          y: panelRange.minY - this._config.theme.description_top_margin,
          text: content,
        },           descriptionStyle),
      });
      this.description = text;
      this._resgiterPadding(text);
    }
  }

  protected _beforeInit() {}

  protected _afterInit() {
    const props = this._initialProps;
    /** 处理autopadding逻辑 */
    if (props.padding === 'auto') {
      this.plot.render(false);
      const padding = getAutoPadding(this.plot, this.paddingComponents);
      this.updateConfig({
        padding,
      });

    }
  }

  /** 设置G2 config，带有类型推导 */
  protected _setConfig<T extends keyof G2Config>(key: T, config: G2Config[T] | boolean): void {
    if (key === 'element') {
      this._config.elements.push(config as G2Config['element']);
      return;
    }
    if (config as boolean === false) {
      this._config[key] = false;
      return;
    }
    _.assign(this._config[key], config);
  }

  protected _convert2G2Theme(plotTheme) {
    const g2Theme = _.clone(plotTheme);
    g2Theme.axis.left = {};
    _.deepMix(g2Theme.axis.left, g2Theme.axis.y, {position: 'left'});
    g2Theme.axis.right = {};
    _.deepMix(g2Theme.axis.right, g2Theme.axis.y, {position: 'right'});
    g2Theme.axis.bottom = {};
    _.deepMix(g2Theme.axis.bottom, g2Theme.axis.x, {position: 'bottom'});
    g2Theme.axis.top = {};
    _.deepMix(g2Theme.axis.top, g2Theme.axis.x, {position: 'top'});
    delete g2Theme.axis['x'];
    delete g2Theme.axis['y'];
    
    return g2Theme;
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
    _.each(this.eventHandlers, (handler) => {
      this.plot.off(handler.type, handler.handler);
    });
    const canvasDOM = this.canvasCfg.canvas.get('canvasDOM');
    canvasDOM.parentNode.removeChild(canvasDOM);
    /**TODO: g2底层view销毁时没有销毁tooltip,经查是tooltip迁移过程中去掉了destory方法 */
    this.plot.destroy();
  }

  /** 更新配置项 */
  public updateConfig(cfg): void {
    const newProps = _.deepMix(this._initialProps, cfg);
    _.each(this.eventHandlers, (handler) => {
      this.plot.off(handler.type, handler.handler);
    });
    this.plot.destroy();
    this._initialProps = newProps;
    this._init(this._container, this.canvasCfg);
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

  /** 自定义组件参与padding */
  private _resgiterPadding(components: Element) {
    this.paddingComponents.push(components);
  }

  private _getTheme() {
    let userPlotTheme = {};
    if (this._initialProps.theme) {
      userPlotTheme = this._initialProps.theme;
    }
    return _.deepMix({}, globalTheme.getPlotTheme(this.type), userPlotTheme);
  }

  private _getG2Theme() {
    const plotG2Theme = this._convert2G2Theme(this.plotTheme);
    const finalTheme = {};
    _.deepMix(finalTheme, G2DefaultTheme, plotG2Theme);
    this._processVisible(finalTheme);
    return finalTheme;
  }

  private _processVisible(theme) {
    processAxisVisible(theme.axis.left);
    processAxisVisible(theme.axis.right);
    processAxisVisible(theme.axis.top);
    processAxisVisible(theme.axis.bottom);
    return theme;
  }
}
