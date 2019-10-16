import { BBox, Canvas, Group } from '@antv/g';
import * as G2 from '@antv/g2';
import * as _ from '@antv/util';
import TextDescription from '../components/description';
import { getComponent } from '../components/factory';
import BaseInteraction, { InteractionCtor } from '../interaction';
import Config, { G2Config } from '../interface/config';
import { MarginPadding } from '../interface/types';
import { EVENT_MAP, onEvent } from '../util/event';
import CanvasController from './controller/canvas';
import PaddingController from './controller/padding';
import StateController from './controller/state';
import ThemeController from './controller/theme';
import Layer from './Layer';

export default abstract class ViewLayer<T extends Config = Config> extends Layer<T> {
  public plot: G2.View;

  protected originalProps: T;
  protected config: G2Config;
  protected title: TextDescription;
  protected description: TextDescription;
  protected range: BBox;
  protected plotTheme: any;
  protected canvas: Canvas;
  protected container: Group;
  protected paddingController: PaddingController;
  protected stateController: StateController;
  private interactions: BaseInteraction[];

  constructor(canvasController: CanvasController, themeController: ThemeController, range: BBox, config: T) {
    /**
     * 储存初始化配置项，获取图表主题，创建图表容器及画布
     */
    super(canvasController, themeController, range, config);
    this.canvas = canvasController.canvas;
    this.container = canvasController.canvas.addGroup();
    this.originalProps = _.deepMix({}, config);

    this.paddingController = new PaddingController({
      plot: this,
    });
    this.stateController = new StateController({
      plot: this,
    });
    /**
     * 启动主流程，挂载钩子
     */
    this.beforeInit();
    this.init();
    this.afterInit();
  }

  public getTheme(): any {
    return this.themeController.getTheme(this.initialProps, this.type);
  }

  public getResponsiveTheme() {
    return this.themeController.getResponsiveTheme(this.type);
  }

  /** 自定义组件参与padding */
  public registerPadding(component: Element) {
    this.paddingController.registerPadding(component);
  }

  /** 修改数据 */
  public changeData(data: object[]): void {
    this.plot.changeData(data);
  }

  /** 完整生命周期渲染 */
  public render(): void {
    const data = this.initialProps.data;
    if (!_.isEmpty(data)) {
      this.plot.render();
    }
  }

  /** 销毁 */
  public destroy(): void {
    this.doDestroy();
    super.destroy();
  }

  /** 更新配置项 */
  public updateConfig(cfg): void {
    this.doDestroy();
    if (!cfg.padding && this.originalProps.padding && this.originalProps.padding === 'auto') {
      cfg.padding = 'auto';
    }
    const newProps = _.deepMix({}, this.initialProps, cfg);
    this.initialProps = newProps;
    this.beforeInit();
    this.init();
    this.afterInit();
  }

  // 绑定一个外部的stateManager
  public bindStateManager(stateManager, cfg): void {
    this.stateController.bindStateManager(stateManager, cfg);
  }

  // 响应状态量更新的快捷方法
  public setActive(condition, style) {
    this.stateController.setState({ type: 'active', condition, style });
  }

  public setSelected(condition, style) {
    this.stateController.setState({ type: 'selected', condition, style });
  }

  public setDisable(condition, style) {
    this.stateController.setState({ type: 'disable', condition, style });
  }

  public setNormal(condition) {
    this.stateController.setState({ type: 'normal', condition, style: {} });
  }

  protected abstract geometryParser(dim: string, type: string): string;

  protected init() {
    const props = this.initialProps;
    const theme = this.themeController.getTheme(props, this.getType());
    this.plotTheme = this.themeController.getPlotTheme(props, this.getType());

    this.config = {
      scales: {},
      legends: {
        position: theme.legend.position,
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

    if (theme.backgroundStyle && theme.backgroundStyle.fill) {
      this.canvasController.updateCanvasStyle({ backgroundColor: theme.backgroundStyle.fill });
    }

    /** 绘制title & description */
    const panelRange = this.getPanelRange();
    this.config.panelRange = panelRange;

    this._title(panelRange);
    this._description(panelRange);

    const layerRange = this.getLayerRange();
    const [marginTop, marginRight, marginBottom, marginLeft] = this.getViewMargin();

    this._setDefaultG2Config();
    this._coord();
    this._scale();
    this._axis();
    this._tooltip();
    this._legend();
    this._addGeometry();
    this._annotation();
    this._animation();

    this.plot = new G2.View({
      width: this.getLayerWidth(),
      height: this.getLayerHeight(),
      canvas: this.canvas,
      container: this.container,
      padding: this.paddingController.getPadding(),
      data: props.data,
      theme: this.config.theme,
      options: this.config,
      start: { x: layerRange.minX + marginLeft, y: layerRange.minY + marginTop },
      end: { x: layerRange.maxX - marginRight, y: layerRange.maxY - marginBottom },
    });
    this._interactions();
    this._events();
    this.plot.on('afterrender', () => {
      this.afterRender();
    });
  }

  /** 设置G2默认配置项 */
  protected abstract _setDefaultG2Config(): void;

  /** 配置G2各组件 */
  // protected abstract _axis(): void;
  protected abstract _coord(): void;
  protected abstract _annotation(): void;
  protected abstract _addGeometry(): void;
  protected abstract _animation(): void;

  protected _interactions(): void {
    const { interactions = [] } = this.initialProps;
    if (this.interactions) {
      this.interactions.forEach((inst) => {
        inst.destroy();
      });
    }
    this.interactions = [];
    interactions.forEach((interaction) => {
      const Ctor: InteractionCtor = BaseInteraction.getInteraction(interaction.type, this.type);
      const inst: BaseInteraction = new Ctor(
        { view: this.plot },
        this,
        Ctor.getInteractionRange(this.getLayerRange(), interaction.cfg),
        interaction.cfg
      );
      this.interactions.push(inst);
    });
  }

  /** plot通用配置 */

  protected _scale(): void {
    /** scale meta配置 */
    const props = this.initialProps;
    const scales = _.mapValues(this.config.scales, (scaleConfig: any, field: string) => {
      const meta: Config['meta']['key'] = _.get(props.meta, field);
      // meta中存在对应配置，则补充入
      if (meta) {
        return _.assign({}, scaleConfig, meta);
      }
      return scaleConfig;
    });
    this.setConfig('scales', scales);
  }

  protected _axis(): void {
    const props = this.initialProps;
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
    this.setConfig('axes', axesConfig);
  }

  protected _tooltip(): void {
    const props = this.initialProps;
    if (props.tooltip && props.tooltip.visible === false) {
      this.setConfig('tooltip', false);
      return;
    }

    this.setConfig('tooltip', {
      crosshairs: _.get(props, 'tooltip.crosshairs'),
      shared: _.get(props, 'tooltip.shared'),
      htmlContent: _.get(props, 'tooltip.htmlContent'),
      containerTpl: _.get(props, 'tooltip.containerTpl'),
      itemTpl: _.get(props, 'tooltip.itemTpl'),
    });

    if (props.tooltip && props.tooltip.style) {
      _.deepMix(this.config.theme.tooltip, props.tooltip.style);
    }
  }

  protected _legend(): void {
    const props = this.initialProps;
    if (props.legend && props.legend.visible === false) {
      this.setConfig('legends', false);
      return;
    }

    const flipOption = _.get(props, 'legend.flipPage');

    this.setConfig('legends', {
      position: _.get(props, 'legend.position'),
      formatter: _.get(props, 'legend.formatter'),
      offsetX: _.get(props, 'legend.offsetX'),
      offsetY: _.get(props, 'legend.offsetY'),
      flipPage: flipOption,
    });
  }

  protected _events(eventParser?): void {
    const props = this.initialProps;
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
    const props = this.initialProps;
    const range = this.range;
    this.title = null;
    if (props.title) {
      const width = this.getLayerWidth();
      const theme = this.config.theme;
      const title = new TextDescription({
        leftMargin: range.minX + theme.title.padding[3],
        topMargin: range.minY + theme.title.padding[0],
        text: props.title.text,
        style: _.mix(theme.title, props.title.style),
        wrapperWidth: width - theme.title.padding[3] - theme.title.padding[1],
        container: this.container.addGroup(),
        theme,
      });
      this.title = title;
    }
  }

  protected _description(panelRange: BBox): void {
    const props = this.initialProps;
    const range = this.range;
    this.description = null;

    if (props.description) {
      const width = this.getLayerWidth();

      let topMargin = range.minY;
      if (this.title) {
        const titleBBox = this.title.getBBox();
        topMargin = titleBBox.minY + titleBBox.height;
      }

      const theme = this.config.theme;
      const description = new TextDescription({
        leftMargin: range.minX + theme.description.padding[3],
        topMargin: topMargin + theme.description.padding[0],
        text: props.description.text,
        style: _.mix(theme.description, props.description.style),
        wrapperWidth: width - theme.description.padding[3] - theme.description.padding[1],
        container: this.container.addGroup(),
        theme,
      });

      this.description = description;
    }
  }

  protected beforeInit() {}

  protected afterInit() {
    if (!this.plot || this.plot.destroyed) {
      return;
    }
  }

  protected afterRender() {
    if (!this.plot || this.plot.destroyed) {
      return;
    }
    const props = this.initialProps;
    const padding = props.padding ? props.padding : this.config.theme.padding;
    /** defaultState */
    if (props.defaultState && padding !== 'auto') {
      this.stateController.defaultStates(props.defaultState);
    }
    /** autopadding */
    if (padding === 'auto') {
      this.paddingController.processAutoPadding();
    }
  }

  /** 设置G2 config，带有类型推导 */
  protected setConfig<K extends keyof G2Config>(key: K, config: G2Config[K] | boolean): void {
    if (key === 'element') {
      this.config.elements.push(config as G2Config['element']);
      return;
    }
    if ((config as boolean) === false) {
      this.config[key] = false;
      return;
    }
    _.assign(this.config[key], config);
  }

  /** 抽取destroy和updateConfig共有代码为_destroy方法 */
  private doDestroy() {
    /** 移除title & description */
    if (this.title) {
      this.title.destroy();
    }
    if (this.description) {
      this.description.destroy();
    }
    // 移除注册的 interactions
    if (this.interactions) {
      this.interactions.forEach((inst) => {
        inst.destroy();
      });
    }
    /** 销毁g2.plot实例 */
    this.plot.destroy();
  }

  // 为了方便图表布局，title和description在view创建之前绘制，需要先计算view的plotRange,方便title & description文字折行
  private getPanelRange() {
    const range = this.getLayerRange();
    const padding = this.paddingController.getPadding();
    const width = this.getLayerWidth();
    const height = this.getLayerHeight();
    const [top, right, bottom, left] = padding;

    return new BBox(range.minX + left, range.minY + top, width - left - right, height - top - bottom);
  }

  // view range 去除title & description所占的空间
  private getViewMargin(): MarginPadding {
    const { interactions = [] } = this.initialProps;
    const layerRange = this.getLayerRange();
    const margin: MarginPadding = [0, 0, 0, 0];
    const boxes: BBox[] = [];

    // 先只考虑 title 和 description 在上方的情况
    if (this.title) {
      boxes.push(this.title.getBBox());
    }
    if (this.description) {
      boxes.push(this.description.getBBox());
    }
    if (boxes.length > 0) {
      _.each(boxes, (box) => {
        if (box.maxY > margin[0]) {
          margin[0] = box.maxY;
        }
      });
    }
    if (this.description) {
      const legendPosition = this.getLegendPosition();
      margin[0] += this.config.theme.description.padding[2](legendPosition);
    }
    if (margin[0] >= this.getLayerHeight()) {
      margin[0] -= 0.1;
    }

    // 有 Range 的 Interaction 参与 ViewMargin 计算
    interactions.forEach((interaction) => {
      const Ctor: InteractionCtor | null = BaseInteraction.getInteraction(interaction.type, this.type);
      const range: BBox | null = Ctor ? Ctor.getInteractionRange(layerRange, interaction.cfg) : null;
      if (range) {
        // 先只考虑 Range 靠边的情况
        if (range.bottom === layerRange.bottom) {
          margin[2] += range.height;
        } else if (range.right === layerRange.right) {
          margin[1] += range.width;
        } else if (range.left === layerRange.left) {
          margin[3] += range.width;
        } else if (range.top === layerRange.top) {
          margin[0] += range.height;
        }
      }
    });

    return margin;
  }

  private getLegendPosition() {
    const props = this.initialProps;
    if (props.legend && props.legend.position) {
      const position = props.legend.position;
      return position;
    }
    return 'bottom-center';
  }
}
