import { BBox } from '@antv/g';
import * as G2 from '@antv/g2';
import * as _ from '@antv/util';
import TextDescription from '../components/description';
import { getComponent } from '../components/factory';
import BaseInteraction, { InteractionCtor } from '../interaction/index';
import {
  Axis,
  IDescription,
  IInteractions,
  ITitle,
  Label,
  Legend,
  StateConfig,
  Tooltip,
  DataItem,
} from '../interface/config';
import { G2Config } from '../interface/config';
import { EVENT_MAP, onEvent } from '../util/event';
import PaddingController from './controller/padding';
import StateController from './controller/state';
import ThemeController from './controller/theme';
import Layer, { LayerConfig, Region } from './layer';
import { isTextUsable } from '../util/common';

export interface ViewConfig {
  data: DataItem[];
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
  title?: ITitle;
  description?: IDescription;
  events?: {
    [k: string]: ((...args: any[]) => any) | boolean;
  };
  defaultState?: {
    active?: StateConfig;
    inActive?: StateConfig;
    selected?: StateConfig;
    disabled?: StateConfig;
  };
}

export interface ViewLayerConfig extends ViewConfig, LayerConfig {}

/**
 * 获取Region
 *
 * @param viewRange - box
 */
function getRegion(viewRange: BBox): Region {
  return { start: { x: viewRange.minX, y: viewRange.minY }, end: { x: viewRange.maxX, y: viewRange.maxY } };
}

export default abstract class ViewLayer<T extends ViewLayerConfig = ViewLayerConfig> extends Layer<T> {
  public static getDefaultOptions(): Partial<ViewConfig> {
    return {
      title: {
        visible: false,
        text: '',
      },
      description: {
        visible: false,
        text: '',
      },
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
  public title: TextDescription;
  public description: TextDescription;
  protected paddingController: PaddingController;
  protected stateController: StateController;
  protected themeController: ThemeController;
  public config: G2Config;
  private interactions: BaseInteraction[] = [];

  constructor(props: T) {
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

  public getOptions(props: T): T {
    const options = super.getOptions(props);
    // @ts-ignore
    const defaultOptions = this.constructor.getDefaultOptions();
    return _.deepMix({}, options, defaultOptions, props);
  }

  public beforeInit() {
    super.beforeInit();
  }

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

    this.paddingController.clear();

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
    this.view.on('afterrender', () => {
      this.afterRender();
    });
  }

  public afterInit() {
    super.afterInit();
    if (!this.view || this.view.destroyed) {
      return;
    }
    if (this.options.padding !== 'auto') {
      this.parseEvents();
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
  public updateConfig(cfg: Partial<T>): void {
    this.doDestroy();
    if (!cfg.padding && this.initialOptions.padding && this.initialOptions.padding === 'auto') {
      cfg.padding = 'auto';
    }
    this.options = _.deepMix({}, this.options, cfg);
    this.processOptions(this.options);
  }

  public changeData(data: DataItem[]): void {
    this.view.changeData(this.processData(data));
  }

  // plot 不断销毁重建，需要一个api获取最新的plot
  public getPlot() {
    return this.view;
  }

  // 获取对应的G2 Theme
  public getTheme() {
    return this.theme;
  }

  public getResponsiveTheme() {
    return this.themeController.getResponsiveTheme(this.type);
  }

  // 获取对应的Plot Theme
  public getPlotTheme() {
    return this.themeController.getPlotTheme(this.options, this.type);
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

  protected processData(data?: DataItem[]): DataItem[] | undefined {
    return data;
  }

  protected abstract coord(): void;

  protected scale(): void {
    /** scale meta配置 */
    // 1. this.config.scales中已有子图形在处理xAxis/yAxis是写入的xField/yField对应的scale信息，这里再检查用户设置的meta，将meta信息合并到默认的scale中
    // 2. 同时xAxis/yAxis中的type优先级更高，覆盖meta中的type配置
    const scaleTypes = _.mapValues(this.config.scales, (scaleConfig) => {
      const type = scaleConfig.type;
      return type ? { type } : {};
    });
    const scales = _.deepMix({}, this.config.scales, this.options.meta || {}, scaleTypes);

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

    this.setConfig('tooltip', _.deepMix({}, _.get(this.options, 'tooltip')));

    _.deepMix(this.config.theme.tooltip, this.options.tooltip.style);
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
      wordSpacing: _.get(this.options, 'legend.wordSpacing'),
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
    if (config === false) {
      this.config[key] = false;
      return;
    }
    _.assign(this.config[key], config);
  }

  protected parseEvents(eventParser?): void {
    const { options } = this;
    if (options.events) {
      super.parseEvents(options.events);
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
    if (this.title) {
      this.title.destroy();
      this.title = null;
    }

    if (isTextUsable(props.title)) {
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
        index: isTextUsable(props.description) ? 0 : 1,
        plot: this,
        name: 'title',
      });
      this.title = title;
      this.paddingController.registerPadding(title, 'outer');
    }
  }

  protected drawDescription(): void {
    const props = this.options;
    const range = this.layerBBox;
    if (this.description) {
      this.description.destroy();
      this.description = null;
    }

    if (isTextUsable(props.description)) {
      const width = this.width;
      const theme = this.config.theme;
      let topMargin = 0;

      if (this.title) {
        const titleBBox = this.title.getBBox();
        topMargin += titleBBox.minY + titleBBox.height;
        topMargin += theme.description.padding[0];
      } else {
        // 无title的情况下使用title的上padding
        topMargin += range.minY + theme.title.padding[0];
      }

      const description = new TextDescription({
        leftMargin: range.minX + theme.description.padding[3],
        topMargin,
        text: props.description.text,
        style: _.mix(theme.description, props.description.style),
        wrapperWidth: width - theme.description.padding[3] - theme.description.padding[1],
        container: this.container.addGroup(),
        theme,
        index: 1,
        plot: this,
        name: 'description',
      });
      this.description = description;
      this.paddingController.registerPadding(description, 'outer');
    }
  }

  /** 抽取destroy和updateConfig共有代码为_destroy方法 */
  private doDestroy() {
    this.doDestroyInteractions();
    /** 销毁g2.view实例 */
    if (!this.view.destroyed) {
      this.view.destroy();
    }
  }

  private doDestroyInteractions() {
    // 移除注册的 interactions
    if (this.interactions) {
      this.interactions.forEach((inst) => {
        inst.destroy();
      });
    }
    this.interactions = [];
  }

  private getViewRange() {
    // 有 Range 的 Interaction 参与 ViewMargin 计算
    const { interactions = [] } = this.options;
    const layerBBox = this.layerBBox;
    interactions.forEach((interaction) => {
      const Ctor: InteractionCtor | undefined = BaseInteraction.getInteraction(interaction.type, this.type);
      const range: BBox | undefined = Ctor && Ctor.getInteractionRange(layerBBox, interaction.cfg);
      let position = '';
      if (range) {
        // 先只考虑 Range 靠边的情况
        if (range.bottom === layerBBox.bottom && range.top > layerBBox.top) {
          // margin[2] += range.height;
          position = 'bottom';
        } else if (range.right === layerBBox.right && range.left > layerBBox.left) {
          // margin[1] += range.width;
          position = 'right';
        } else if (range.left === layerBBox.left && range.right > layerBBox.right) {
          // margin[3] += range.width;
          position = 'left';
        } else if (range.top === layerBBox.top && range.bottom > layerBBox.bottom) {
          // margin[0] += range.height;
          position = 'top';
        }
        this.paddingController.registerPadding(
          {
            getBBox: () => {
              return range;
            },
            position,
          },
          'outer'
        );
      }
    });
    const viewRange = this.paddingController.processOuterPadding();
    return viewRange;
  }
}
