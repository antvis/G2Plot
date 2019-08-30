import { BBox } from '@antv/g';
import * as G2 from '@antv/g2';
import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';
import TextDescription from '../components/description';
import { getComponent } from '../components/factory';
import PlotConfig, { G2Config, RecursivePartial } from '../interface/config';
import { EVENT_MAP, onEvent } from '../util/event';
import CanvasController from './controller/canvas';
import PaddingController from './controller/padding';
import StateController from './controller/state';
import ThemeController from './controller/theme';

export default abstract class BasePlot<T extends PlotConfig = PlotConfig> {
  public plot: G2.View;
  public _initialProps: T;
  public canvasController: CanvasController;
  public eventHandlers: any[] = [];
  public destroyed: boolean = false;
  public type: string;
  protected _originalProps: T;
  protected _config: G2Config;
  protected title: TextDescription;
  protected description: TextDescription;
  protected plotTheme: any;
  private _container: HTMLElement;
  private themeController: ThemeController;
  private paddingController: PaddingController;
  private stateController: StateController;

  constructor(container: string | HTMLElement, config: T) {
    /**
     * 储存初始化配置项，获取图表主题，创建图表容器及画布
     */
    this._initialProps = config;
    this._originalProps = _.deepMix({}, config);
    this._container = _.isString(container) ? document.getElementById(container as string) : (container as HTMLElement);

    this.setType();

    this.themeController = new ThemeController({
      plot: this,
    });
    this.plotTheme = this.themeController.plotTheme;
    this.canvasController = new CanvasController({
      container: this._container,
      plot: this,
    });
    this.paddingController = new PaddingController({
      plot: this,
    });
    this.stateController = new StateController({
      plot: this,
    });
    /**
     * 启动主流程，挂载钩子
     */
    this._beforeInit();
    this._init();
    this._afterInit();
  }

  /** 自定义组件参与padding */
  public resgiterPadding(component: Element) {
    this.paddingController.resgiterPadding(component);
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
    /** 销毁挂载在canvasController上的forcefit监听器 */
    this.canvasController.destory();
    /** 销毁canvas dom */
    const canvasDOM = this.canvasController.canvas.get('canvasDOM');
    canvasDOM.parentNode.removeChild(canvasDOM);
    this._destory();
    this.destroyed = true;
  }

  /** 更新配置项 */
  public updateConfig(cfg): void {
    this._destory();
    if (!cfg.padding && this._originalProps.padding && this._originalProps.padding === 'auto') {
      cfg.padding = 'auto';
    }
    const newProps = _.deepMix({}, this._initialProps, cfg);
    this._initialProps = newProps;
    this.canvasController.updateCanvasSize();
    this._beforeInit();
    this._init();
    this._afterInit();
    this.plot.on('afterrender', () => {
      this._afterRender();
    });
  }

  // 绑定一个外部的stateManager
  public bindStateManager(stateManager, cfg): void {
    this.stateController.bindStateManager(stateManager, cfg);
  }

  // 响应状态量更新的快捷方法
  public setActive(condition, style) {
    this.stateController.setState('active', condition, style);
  }

  public setSelected(condition, style) {
    this.stateController.setState('selected', condition, style);
  }

  public setDisable(condition, style) {
    this.stateController.setState('disable', condition, style);
  }

  public setNormal(condition) {
    this.stateController.setState('normal', condition, {});
  }

  protected abstract geometryParser(dim: string, type: string): string;

  protected abstract setType(): void;

  protected _init() {
    this.themeController = new ThemeController({
      plot: this,
    });
    this.plotTheme = this.themeController.plotTheme;
    const props = this._initialProps;
    const theme = this.themeController.theme;
    this._config = {
      scales: {},
      legends: {
        position: theme.defaultLegendPosition,
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
      theme,
      panelRange: {},
    };

    // todo: 太丑了，待优化
    if (theme.backgroundStyle && theme.backgroundStyle.fill) {
      this.canvasController.canvas.get('canvasDOM').style.backgroundColor = theme.backgroundStyle.fill;
    }
    /** 绘制title & description */
    const range = this._getPanelRange();
    this._config.panelRange = range;

    this._title(range);
    this._description(range);

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

    this.plot = new G2.View({
      width: this.canvasController.width,
      height: this.canvasController.height,
      canvas: this.canvasController.canvas,
      container: this.canvasController.canvas.addGroup(),
      padding: this.paddingController.getPadding(),
      data: props.data,
      theme: this._config.theme,
      options: this._config,
      start: { x: 0, y: viewMargin.maxY },
      end: { x: this.canvasController.width, y: this.canvasController.height },
    });
    this._interactions();
    this._events();
  }

  /** 设置G2默认配置项 */
  protected abstract _setDefaultG2Config(): void;

  /** 配置G2各组件 */
  // protected abstract _axis(): void;
  protected abstract _coord(): void;
  protected abstract _annotation(): void;
  protected abstract _addElements(): void;
  protected abstract _animation(): void;
  protected abstract _interactions(): void;

  /** plot通用配置 */

  protected _scale(): void {
    /** scale meta配置 */
    const props = this._initialProps;
    const scales = _.mapValues(this._config.scales, (scaleConfig: any, field: string) => {
      const meta: PlotConfig['meta']['key'] = _.get(props.meta, field);
      // meta中存在对应配置，则补充入
      if (meta) {
        return _.assign({}, scaleConfig, meta);
      }
      return scaleConfig;
    });
    this._setConfig('scales', scales);
  }

  protected _axis(): void {
    const props = this._initialProps;
    const xAxis_parser = getComponent('axis', {
      plot: this,
      dim: 'x',
    });
    const yAxis_parser = getComponent('axis', {
      plot: this,
      dim: 'y',
    });
    const axesConfig = { fields: {} };
    axesConfig.fields[props.xField] = xAxis_parser;
    axesConfig.fields[props.yField] = yAxis_parser;
    /** 存储坐标轴配置项到config */
    this._setConfig('axes', axesConfig);
  }

  protected _tooltip(): void {
    const props = this._initialProps;
    if (props.tooltip && props.tooltip.visible === false) {
      this._setConfig('tooltip', false);
      return;
    }

    this._setConfig('tooltip', {
      crosshairs: _.get(props, 'tooltip.crosshairs'),
      shared: _.get(props, 'tooltip.shared'),
      htmlContent: _.get(props, 'tooltip.htmlContent'),
      containerTpl: _.get(props, 'tooltip.containerTpl'),
      itemTpl: _.get(props, 'tooltip.itemTpl'),
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

    const flipOption = _.get(props, 'legend.flipPage');

    this._setConfig('legends', {
      position: _.get(props, 'legend.position'),
      formatter: _.get(props, 'legend.formatter'),
      offsetX: _.get(props, 'legend.offsetX'),
      offsetY: _.get(props, 'legend.offsetY'),
      flipPage: flipOption,
    });
  }

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

  protected _title(panelRange: BBox): void {
    const props = this._initialProps;
    this.title = null;
    if (props.title) {
      const width = this.canvasController.width;
      const theme = this._config.theme;
      const title = new TextDescription({
        leftMargin: theme.title.padding[3],
        topMargin: theme.title.padding[0],
        text: props.title.text,
        style: _.mix(theme.title, props.title.style),
        wrapperWidth: width - theme.title.padding[3] - theme.title.padding[1],
        container: this.canvasController.canvas,
        theme,
      });
      this.title = title;
    }
  }

  protected _description(panelRange: BBox): void {
    const props = this._initialProps;
    this.description = null;

    if (props.description) {
      const width = this.canvasController.width;

      let topMargin = 0;
      if (this.title) {
        const titleBBox = this.title.getBBox();
        topMargin = titleBBox.minY + titleBBox.height;
      }

      const theme = this._config.theme;
      const description = new TextDescription({
        leftMargin: theme.description.padding[3],
        topMargin: topMargin + theme.description.padding[0],
        text: props.description.text,
        style: _.mix(theme.description, props.description.style),
        wrapperWidth: width - theme.description.padding[3] - theme.description.padding[1],
        container: this.canvasController.canvas,
        theme,
      });

      this.description = description;
    }
  }

  protected _beforeInit() {}

  protected _afterInit() {
    const props = this._initialProps;
    const padding = props.padding ? props.padding : this._config.theme.padding;
    /** 处理autopadding逻辑 */
    if (padding === 'auto') {
      this.paddingController.processAutoPadding();
    }
  }

  protected _afterRender() {
    const props = this._initialProps;
    /** defaultState */
    if (props.defaultState) {
      this.stateController.defaultStates(props.defaultState);
    }
  }

  /** 设置G2 config，带有类型推导 */
  protected _setConfig<K extends keyof G2Config>(key: K, config: G2Config[K] | boolean): void {
    if (key === 'element') {
      this._config.elements.push(config as G2Config['element']);
      return;
    }
    if ((config as boolean) === false) {
      this._config[key] = false;
      return;
    }
    _.assign(this._config[key], config);
  }

  /** 抽取destory和updateConfig共有代码为_destory方法 */
  private _destory() {
    /** 关闭事件监听 */
    _.each(this.eventHandlers, (handler) => {
      this.plot.off(handler.type, handler.handler);
    });
    /** 移除title & description */
    if (this.title) {
      this.title.destory();
    }
    if (this.description) {
      this.description.destory();
    }
    /** 销毁g2.plot实例 */
    this.plot.destroy();
  }

  // 为了方便图表布局，title和description在view创建之前绘制，需要先计算view的plotRange,方便title & description文字折行
  private _getPanelRange() {
    const padding = this.paddingController.getPadding();
    const width = this.canvasController.width;
    const height = this.canvasController.height;
    const top = padding[0];
    const right = padding[1];
    const bottom = padding[2];
    const left = padding[3];
    return new BBox(left, top, width - left - right, height - top - bottom);
  }

  // view range 去除title & description所占的空间
  private _getViewMargin() {
    const props = this._initialProps;
    const boxes: DataPointType[] = [];
    if (this.title) {
      boxes.push(this.title.getBBox());
    }
    if (this.description) {
      boxes.push(this.description.getBBox());
    }
    if (boxes.length === 0) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    } else {
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      _.each(boxes, (box: DataPointType) => {
        minX = Math.min(box.minX, minX);
        maxX = Math.max(box.maxX, maxX);
        minY = Math.min(box.minY, minY);
        maxY = Math.max(box.maxY, maxY);
      });
      const bbox = { minX, maxX, minY, maxY };
      if (this.description) {
        const legendPosition = this._getLegendPosition();
        bbox.maxY += this._config.theme.description.padding[2](legendPosition);
      }
      /** 约束viewRange的start.y，防止坐标轴出现转置 */
      if (bbox.maxY >= this.canvasController.height) {
        bbox.maxY = this.canvasController.height - 0.1;
      }
      return bbox;
    }
  }

  private _getLegendPosition() {
    const props = this._initialProps;
    if (props.legend && props.legend.position) {
      const position = props.legend.position;
      return position;
    }
    return 'bottom-center';
  }
}
