import * as G2 from '@antv/g2';
import * as _ from '@antv/util';
import { DataPointType } from '@antv/g2/lib/interface';
import { Canvas, Text, BBox } from '@antv/g';
import PlotConfig, { G2Config } from '../interface/config';
import getAutoPadding from '../util/padding';
import { textWrapper } from '../util/textWrapper';
import { processAxisVisible } from '../util/axis';
import { EVENT_MAP, onEvent } from '../util/event';
import ResizeObserver from 'resize-observer-polyfill';

import Theme from '../theme';

interface ITheme {
  [key: string]: any;
}

const G2DefaultTheme = G2.Global.theme;

export default abstract class BasePlot<T extends PlotConfig = PlotConfig> {
  /** g2实例 */
  public type: string = 'base';
  public _container: string | HTMLElement;
  public plot: G2.View;
  public destroyed: boolean;
  public _initialProps: T;
  protected _originalProps: T;
  protected _config: G2Config;
  public eventHandlers: any[] = [];
  protected canvasCfg;
  protected paddingComponents: any[] = [];
  protected title: Text;
  protected description: Text;
  protected plotTheme: any;
  private forceFitCb: any;
  private _containerEle: HTMLElement;
  private _resizeObserver: any;

  constructor(container: string | HTMLElement, config: T) {
    this._initialProps = config;
    this._originalProps = _.deepMix({}, config);
    this._container = container;
    this._containerEle = _.isString(container) ? document.getElementById(container) : container;
    this.destroyed = false;
    const self = this;
    this.forceFitCb = _.debounce(() => {
      if (self.destroyed) {
        return;
      }
      const size = this._getCanvasSize(this._initialProps, this._containerEle);
      /** height measure不准导致重复forcefit */
      if (self.canvasCfg.width === size.width) {
        return;
      }
      self._updateCanvasSize(this.canvasCfg);
      self.updateConfig({});
      self.render();

    },                           300);
    if (config.forceFit) {
      const ro = new ResizeObserver(this.forceFitCb);
      ro.observe(this._containerEle);
      this._resizeObserver = ro;
    }
    this.plotTheme = this._getTheme();
    this.canvasCfg = this._createCanvas(container);
    this._beforeInit();
    this._init(container, this.canvasCfg);
    this._afterInit();
  }

  protected _init(container: string | HTMLElement, canvasCfg) {
    const props = this._initialProps;
    const g2Theme: ITheme = this._getG2Theme();
    this._config = {
      scales: {},
      legends: {
        position: g2Theme.defaultLegendPosition,
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
      theme: g2Theme,
      panelRange: {},
    };

    if (g2Theme.backgroundStyle && g2Theme.backgroundStyle.fill) {
      this.canvasCfg.canvas.get('canvasDOM').style.backgroundColor = g2Theme.backgroundStyle.fill;
    }
    /** 绘制title & description */
    const range = this._getPanelRange();
    this._config.panelRange = range;

    this._title(range);
    this._description(range);
    // this._adjustLegendOffset(range);
    const viewMargin = this._getViewMargin();

    this._setDefaultG2Config();
    this._coord();
    this._scale();
    this._axis();
    this._tooltip();
    this._legend();
    this._addElements();
    this._annotation();
    this._animation();

    // 补充scale配置
    const scales = _.mapValues(this._config.scales, (scaleConfig: any, field: string) => {
      const meta: PlotConfig['meta']['key'] = _.get(props.meta, field);
      // meta中存在对应配置，则补充入
      if (meta) {
        return _.assign({}, scaleConfig, meta);
      }
      return scaleConfig;
    });
    this._setConfig('scales', scales);

    this.plot = new G2.View({
      width: canvasCfg.width,
      height: canvasCfg.height,
      canvas: canvasCfg.canvas,
      container: canvasCfg.canvas.addGroup(),
      padding: this._getPadding(),
      data: props.data,
      theme: this._config.theme,
      options: this._config,
      start: { x: 0, y: viewMargin.maxY },
      end: { x: canvasCfg.width, y: canvasCfg.height },
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

  protected _events(eventParser?): void {
    const props = this._initialProps;
    if (props.events) {
      const events = props.events;
      const eventmap = eventParser ? eventParser.EVENT_MAP : EVENT_MAP;
      _.each(events, (e, k) => {
        if (_.isFunction(e)) {
          const eventName = eventmap[e.name] || k;
          const handler = e;
          onEvent(this, eventName, handler);
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
    this._setConfig('legends', {
      offsetX: _.get(props, 'legend.offsetX'),
    });
    this._setConfig('legends', {
      offsetY: _.get(props, 'legend.offsetY'),
    });

    const flipOption = _.get(props, 'legend.flipPage');
    this._setConfig('legends', {
      flipPage: flipOption,
    });
  }

  protected _title(panelRange: BBox): void {
    const props = this._initialProps;
    this.title = null;
    const theme = this._config.theme;
    if (props.title) {
      let leftMargin = panelRange.minX;
      let wrapperWidth = panelRange.width;
      /*tslint:disable*/
      const alignWithAxis = props.title.hasOwnProperty('alignWithAxis') ? props.title.alignWithAxis : theme.title.alignWithAxis;
      if (alignWithAxis === false) {
        leftMargin = theme.defaultPadding[0];
        wrapperWidth = this.canvasCfg.width;
      }
      const titleStyle = _.mix(theme.title, props.title.style);
      const content: string = textWrapper(props.title.text, wrapperWidth, titleStyle);
      const container = this.canvasCfg.canvas;
      const text = container.addShape('text', {
        attrs: _.mix({
          x: leftMargin,
          y: theme.title.top_margin,
          text: content,
        }, titleStyle),
      });
      this.title = text;
    }
  }

  protected _description(panelRange: BBox): void {
    const props = this._initialProps;
    this.description = null;
    const theme = this._config.theme;
    if (props.description) {
      let topMargin = 0;
      if (this.title) {
        const titleBBox = this.title.getBBox();
        topMargin = titleBBox.minY + titleBBox.height;
      }
      let leftMargin = panelRange.minX;
      let wrapperWidth = panelRange.width;
      /*tslint:disable*/
      const alignWithAxis = props.description.hasOwnProperty('alignWithAxis') ? props.description.alignWithAxis : theme.description.alignWithAxis;
      if (alignWithAxis === false) {
        leftMargin = theme.defaultPadding[0];
        wrapperWidth = this.canvasCfg.width;
      }
      const descriptionStyle = _.mix(theme.description, props.description.style);
      const content: string = textWrapper(props.description.text, wrapperWidth, descriptionStyle);
      const container = this.canvasCfg.canvas;
      const text = container.addShape('text', {
        attrs: _.mix({
          x: leftMargin, // panelRange.minX
          y: topMargin + theme.description.top_margin,
          text: content,
        }, descriptionStyle),
      });
      this.description = text;
    }
  }

  protected _beforeInit() { }

  protected _afterInit() {
    const props = this._initialProps;
    const padding = props.padding ? props.padding : this._config.theme.padding;
    /** 处理autopadding逻辑 */
    if (padding === 'auto') {
      this.plot.render(false);
      const padding = getAutoPadding(this.plot, this.paddingComponents, this._config.theme.defaultPadding);
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
    return Theme.convert2G2Theme(plotTheme);
  }

  /** 自定义组件参与padding */
  public resgiterPadding(components: Element) {
    this.paddingComponents.push(components);
  }

  /** 修改数据 */
  public changeData(data: object[]): void {
    this.plot.changeData(data);
  }

  /** 完整生命周期渲染 */
  public render(): void {
    const data = this._initialProps.data;
    if (!_.isEmpty(data)) {
      this.plot.render();
    }
  }

  /** 画布内容重绘 */
  public repaint(): void {
    this.plot.get('canvas').draw();
  }

  /** 销毁 */
  public destroy(): void {
    if (this._resizeObserver) {
      this._resizeObserver.unobserve(this._containerEle);
      this._containerEle = null;
    }
    _.each(this.eventHandlers, (handler) => {
      this.plot.off(handler.type, handler.handler);
    });
    /** 移除title & description */
    if (this.title) this.title.remove();
    if (this.description) this.description.remove();
    const canvasDOM = this.canvasCfg.canvas.get('canvasDOM');
    canvasDOM.parentNode.removeChild(canvasDOM);
    /** TODO: g2底层view销毁时没有销毁tooltip,经查是tooltip迁移过程中去掉了destory方法 */
    this.plot.destroy();
    this.destroyed = true;
  }

  /** 更新配置项 */
  public updateConfig(cfg): void {
    if(!cfg.padding && this._originalProps.padding && this._originalProps.padding === 'auto'){
      cfg.padding = 'auto';
    }
    const newProps = _.deepMix({}, this._initialProps, cfg);
    
    _.each(this.eventHandlers, (handler) => {
      this.plot.off(handler.type, handler.handler);
    });
    this.plot.destroy();
    /** 移除title & description */
    if (this.title) this.title.remove();
    if (this.description) this.description.remove();
    this._initialProps = newProps;
    this.canvasCfg.width = this._initialProps.width;
    this.canvasCfg.height = this._initialProps.height;
    this._updateCanvasSize(this.canvasCfg);
    this._beforeInit();
    this._init(this._container, this.canvasCfg);
    this._afterInit();
  }

  private _createCanvas(container) {
    // TODO: coord width问题
    const props = this._initialProps;
    const size = this._getCanvasSize(this._initialProps, this._containerEle);

    const canvas = new Canvas({
      containerDOM: !_.isString(container) ? container : undefined,
      containerId: _.isString(container) ? container : undefined,
      width: size.width,
      height: size.height,
      renderer: props.renderer ? props.renderer : 'canvas',
      pixelRatio: 2,
    });
    return { canvas, width: size.width, height: size.height };
  }

  private _updateCanvasSize(canvasCfg) {
    const size = this._getCanvasSize(this._initialProps, this._containerEle);

    canvasCfg.width = size.width;
    canvasCfg.height = size.height;
    canvasCfg.canvas.changeSize(size.width, size.height);
  }

  private _getCanvasSize(props, containerEle) {
    const plotTheme = this.plotTheme;
    let width = props.width ? props.width : plotTheme.width;
    let height = props.height ? props.height : plotTheme.height;
    if (props.forceFit && containerEle.offsetWidth) {
      width = containerEle.offsetWidth;
    }
    if (props.forceFit && containerEle.offsetHeight) {
      height = containerEle.offsetHeight;
    }
    return { width, height };
  }

  private _getPadding() {
    const props = this._initialProps;
    const padding = props.padding ? props.padding : this._config.theme.padding;
    if (padding === 'auto') return [0, 0, 0, 0];
    return padding;
  }

  private _getTheme() {
    let userPlotTheme = {};
    const propsTheme = this._initialProps.theme;
    if (propsTheme) {
      // theme 以 name 的方式配置
      if (_.isString(propsTheme)) {
        userPlotTheme = Theme.getThemeByName(propsTheme).getPlotTheme(this.type);
      } else {
        userPlotTheme = this._initialProps.theme;
      }
    }
    const globalTheme = Theme.getCurrentTheme();
    return _.deepMix({}, globalTheme.getPlotTheme(this.type), userPlotTheme);
  }

  private _getG2Theme() {
    const plotG2Theme = this._convert2G2Theme(this.plotTheme);
    const finalTheme: DataPointType = {};
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

  // 为了方便图表布局，title和description在view创建之前绘制，需要先计算view的plotRange,方便title & description文字折行
  private _getPanelRange() {
    const padding = this._getPadding();
    const width = this.canvasCfg.width;
    const height = this.canvasCfg.height;
    const top = padding[0];
    const right = padding[1];
    const bottom = padding[2];
    const left = padding[3];
    return new BBox(left, top, width - left - right, height - top - bottom);
  }

  // view range 去除title & description所占的空间
  private _getViewMargin() {
    const boxes = [];
    if (this.title) boxes.push(this.title.getBBox());
    if (this.description) boxes.push(this.description.getBBox());
    if (boxes.length === 0) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    } {
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = - Infinity;
      _.each(boxes, (bbox) => {
        const box = bbox as DataPointType;
        minX = Math.min(box.minX, minX);
        maxX = Math.max(box.maxX, maxX);
        minY = Math.min(box.minY, minY);
        maxY = Math.max(box.maxY, maxY);
      });
      const bbox = { minX, maxX, minY, maxY };
      if (this.description) bbox.maxY += this._config.theme.description.bottom_margin;

      /** 约束viewRange的start.y，防止坐标轴出现转置 */
      if (bbox.maxY >= this.canvasCfg.height) {
        bbox.maxY = this.canvasCfg.height - 0.1;
      }
      return bbox;
    }
  }

  private _adjustLegendOffset(range) {
    const props = this._initialProps;
    const theme = _.clone(this._config.theme);
    const legendPosition = props.legend && props.legend.position ? props.legend.position : theme.defaultLegendPosition;
    const titleAlignWithAxis = props.title && props.title.hasOwnProperty('alignWithAxis') ? props.title.alignWithAxis : theme.title.alignWithAxis;
    const desAlignWithAxis = props.description && props.description.hasOwnProperty('alignWithAxis') ? props.description.alignWithAxis : theme.description.alignWithAxis;

    if ((this.title || this.description) && legendPosition === 'top-left') {
      let offset = theme.defaultPadding[0];
      if (props.legend == null) {
        props.legend = {};
      }
      if (titleAlignWithAxis !== false || desAlignWithAxis !== false) {
        offset = range.minX;
        if (props.legend.offsetX) offset += props.legend.offsetX;
      }
      props.legend.offsetX = offset;
    }
  }

}
