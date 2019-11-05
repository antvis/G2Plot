import { BBox } from '@antv/g';
import * as G2 from '@antv/g2';
import * as _ from '@antv/util';
import TextDescription from '../components/description';
import { getComponent } from '../components/factory-refactor';
import BaseInteraction, { InteractionCtor } from '../interaction/index-refactor';
import { Axis, IInteractions, Label, Legend, StateConfig, Tooltip } from '../interface/config';
import { G2Config } from '../interface/config';
import { EVENT_MAP, onEvent } from '../util/event';
import PaddingController from './controller/padding-refactor';
import StateController from './controller/state';
import ThemeController from './controller/theme';
import Layer, { LayerCfg } from './Layer-refactor';

export interface ViewLayerCfg extends LayerCfg {
  data: object[];
  meta?: { [fieldId: string]: any & { type?: any } };
  padding?: number | number[] | string;
  xField?: string;
  yField?: string;
  color?: string | string[] | {};
  size?: number | number[] | {};
  shape?: string | string[] | {};
  xAxis?: Axis;
  yAxis?: Axis;
  label?: Label;
  tooltip?: Tooltip;
  legend?: Legend;
  animation?: any | boolean;
  theme?: {} | string;
  responsiveTheme?: {} | string;
  interactions?: IInteractions[];
  responsive?: boolean;
  events?: {
    [k: string]: ((...args: any[]) => any) | boolean;
  };
  defaultState?: {
    active?: StateConfig;
    inActive?: StateConfig;
    selected?: StateConfig;
    disabled?: StateConfig;
  };
  // fixme: any
  [k: string]: any;
}

export default abstract class ViewLayer<T extends ViewLayerCfg = ViewLayerCfg> extends Layer {
  public static getDefaultOptions(): any {
    return {
      width: 400,
      height: 400,
      title: {
        visible: false,
        text: '',
      },
      description: {
        visible: false,
        text: '',
      },
      forceFit: true,
      padding: 'auto',
      legend: {
        visible: true,
        position: 'bottom-center',
      },
      tooltip: {
        visible: true,
        shared: true,
        crosshairs: {
          type: 'y',
        },
      },
      xAxis: {
        visible: true,
        autoHideLabel: false,
        autoRotateLabel: false,
        autoRotateTitle: false,
        grid: {
          visible: false,
        },
        line: {
          visible: false,
        },
        tickLine: {
          visible: true,
        },
        label: {
          visible: true,
        },
        title: {
          visible: false,
          offset: 12,
        },
      },
      yAxis: {
        visible: true,
        autoHideLabel: false,
        autoRotateLabel: false,
        autoRotateTitle: true,
        grid: {
          visible: true,
        },
        line: {
          visible: false,
        },
        tickLine: {
          visible: false,
        },
        label: {
          visible: true,
        },
        title: {
          visible: false,
          offset: 12,
        },
      },
      label: {
        visible: false,
      },
    };
  }
  public type: string;
  public view: G2.View;
  public theme: any;
  public initialOptions: T;
  public options: T;
  protected paddingController: PaddingController;
  protected stateController: StateController;
  protected themeController: ThemeController;
  protected config: G2Config;
  protected title: TextDescription;
  protected description: TextDescription;
  private interactions: BaseInteraction[] = [];

  constructor(props: ViewLayerCfg) {
    super(props);
    this.options = this.getOptions(props);
    this.initialOptions = _.deepMix({}, this.options);
    this.paddingController = new PaddingController({
      plot: this,
    });
    this.stateController = new StateController({
      plot: this,
    });
    this.themeController = new ThemeController();
  }

  public getOptions(props: ViewLayerCfg) {
    const options = super.getOptions(props);
    // @ts-ignore
    const defaultOptions = this.constructor.getDefaultOptions();
    return _.deepMix({}, options, defaultOptions, props);
  }

  public beforeInit() {}

  public init() {
    super.init();
    this.theme = this.themeController.getTheme(this.options, this.type);
    this.config = {
      scales: {},
      legends: {},
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
      theme: this.theme,
      panelRange: {},
    };

    this.drawTitle();
    this.drawDescription();

    this.coord();
    this.scale();
    this.axis();
    this.tooltip();
    this.legend();
    this.addGeometry();
    this.annotation();
    this.animation();

    const viewRange = this.getViewRange();

    this.view = new G2.View({
      width: this.width,
      height: this.height,
      canvas: this.canvas,
      container: this.container,
      padding: this.paddingController.getPadding(),
      data: this.processData(this.options.data),
      theme: this.theme,
      options: this.config,
      start: { x: viewRange.minX, y: viewRange.minY },
      end: { x: viewRange.maxX, y: viewRange.maxY },
    });
    this.applyInteractions();
    this.parserEvents();
    this.view.on('afterrender', () => {
      this.afterRender();
    });
  }

  public afterInit() {
    super.afterInit();
    if (!this.view || this.view.destroyed) {
      return;
    }
  }

  public afterRender() {
    if (!this.view || this.view.destroyed) {
      return;
    }
    const { options } = this;
    const padding = options.padding ? options.padding : this.config.theme.padding;
    /** defaultState */
    if (options.defaultState && padding !== 'auto') {
      this.stateController.defaultStates(options.defaultState);
    }
    /** autopadding */
    if (padding === 'auto') {
      this.paddingController.processAutoPadding();
    }
  }

  /** 完整生命周期渲染 */
  public render(): void {
    super.render();
    const { data } = this.options;
    if (!_.isEmpty(data)) {
      this.view.render();
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
    if (!cfg.padding && this.initialOptions.padding && this.initialOptions.padding === 'auto') {
      cfg.padding = 'auto';
    }
    const newProps = _.deepMix({}, this.options, cfg);
    this.options = newProps;
    this.render();
  }

  public changeData(data: object[]): void {
    this.view.changeData(this.processData(data));
  }

  // plot 不断销毁重建，需要一个api获取最新的plot
  public getPlot() {
    return this.view;
  }

  public getResponsiveTheme() {
    return this.themeController.getResponsiveTheme(this.type);
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

  // 获取 ViewLayer 的数据项
  public getData(start?: number, end?: number): object[] {
    return this.processData((this.options.data || []).slice(start, end));
  }

  protected processData(data?: object[]): object[] | undefined {
    return data;
  }

  protected abstract coord(): void;

  protected scale(): void {
    /** scale meta配置 */
    // this.config.scales中已有子图形在处理xAxis/yAxis是写入的xField/yField对应的scale信息，这里再检查用户设置的meta，将meta信息合并到默认的scale中
    const scales = _.assign({}, this.config.scales, this.options.meta || {});
    this.setConfig('scales', scales);
  }

  protected axis(): void {
    const xAxis_parser = getComponent('axis', {
      plot: this,
      dim: 'x',
    });
    const yAxis_parser = getComponent('axis', {
      plot: this,
      dim: 'y',
    });
    const axesConfig = { fields: {} };
    axesConfig.fields[this.options.xField] = xAxis_parser;
    axesConfig.fields[this.options.yField] = yAxis_parser;
    /** 存储坐标轴配置项到config */
    this.setConfig('axes', axesConfig);
  }

  protected tooltip(): void {
    if (this.options.tooltip.visible === false) {
      this.setConfig('tooltip', false);
      return;
    }

    this.setConfig('tooltip', {
      crosshairs: _.get(this.options, 'tooltip.crosshairs'),
      shared: _.get(this.options, 'tooltip.shared'),
      htmlContent: _.get(this.options, 'tooltip.htmlContent'),
      containerTpl: _.get(this.options, 'tooltip.containerTpl'),
      itemTpl: _.get(this.options, 'tooltip.itemTpl'),
    });

    if (this.options.tooltip.style) {
      _.deepMix(this.config.theme.tooltip, this.options.tooltip.style);
    }
  }

  protected legend(): void {
    if (this.options.legend.visible === false) {
      this.setConfig('legends', false);
      return;
    }
    const flipOption = _.get(this.options, 'legend.flipPage');
    this.setConfig('legends', {
      position: _.get(this.options, 'legend.position'),
      formatter: _.get(this.options, 'legend.formatter'),
      offsetX: _.get(this.options, 'legend.offsetX'),
      offsetY: _.get(this.options, 'legend.offsetY'),
      flipPage: flipOption,
    });
  }

  protected abstract annotation(): void;
  protected abstract addGeometry(): void;
  protected abstract geometryParser(dim: string, type: string): string;
  protected abstract animation(): void;

  protected applyInteractions(): void {
    const { interactions = [] } = this.options;
    if (this.interactions) {
      this.interactions.forEach((inst) => {
        inst.destroy();
      });
    }
    this.interactions = [];
    interactions.forEach((interaction) => {
      const Ctor: InteractionCtor | undefined = BaseInteraction.getInteraction(interaction.type, this.type);
      if (Ctor) {
        const inst: BaseInteraction = new Ctor(
          { view: this.view },
          this,
          Ctor.getInteractionRange(this.layerBBox, interaction.cfg),
          interaction.cfg
        );
        this.interactions.push(inst);
      }
    });
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

  protected parserEvents(eventParser?): void {
    const { options } = this;
    if (options.events) {
      const eventmap = eventParser ? eventParser.EVENT_MAP : EVENT_MAP;
      _.each(options.events, (e, k) => {
        if (_.isFunction(e)) {
          const eventName = eventmap[k] || k;
          const handler = e;
          onEvent(this, eventName, handler);
        }
      });
    }
  }

  protected drawTitle(): void {
    const props = this.options;
    const range = this.layerBBox;
    this.title = null;
    if (props.title.visible) {
      const width = this.width;
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
      this.paddingController.registerPadding(title, 'outer');
    }
  }

  protected drawDescription(): void {
    const props = this.options;
    const range = this.layerBBox;
    this.description = null;

    if (props.description.visible) {
      const width = this.width;

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
      this.paddingController.registerPadding(description, 'outer');
    }
  }

  /** 抽取destroy和updateConfig共有代码为_destroy方法 */
  private doDestroy() {
    // 移除注册的 interactions
    if (this.interactions) {
      this.interactions.forEach((inst) => {
        inst.destroy();
      });
    }
    /** 销毁g2.view实例 */
    this.view.destroy();
  }

  private getViewRange() {
    // 有 Range 的 Interaction 参与 ViewMargin 计算
    this.interactions.forEach((interaction) => {
      const Ctor: InteractionCtor | undefined = BaseInteraction.getInteraction('slider', this.type);
      const range: BBox | undefined = Ctor && Ctor.getInteractionRange(this.layerBBox, interaction.cfg);
      if (range) {
        this.paddingController.registerPadding(
          {
            getBBox: () => {
              return range;
            },
            position: 'bottom',
          },
          'outer'
        );
      }
    });
    const viewRange = this.paddingController.processOuterPadding();
    return viewRange;
  }
}
