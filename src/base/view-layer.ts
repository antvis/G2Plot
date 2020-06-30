import {
  deepMix,
  isEmpty,
  mapValues,
  get,
  each,
  assign,
  isFunction,
  mix,
  map,
  flatten,
  reduce,
  findIndex,
  isString,
  contains,
  hasKey,
} from '@antv/util';
import { View, Geometry, VIEW_LIFE_CIRCLE } from '../dependents';
import TextDescription from '../components/description';
import BaseLabel, { LabelComponentConfig, getLabelComponent } from '../components/label/base';
import { getComponent } from '../components/factory';
import Interaction from '../interaction/core';
import BaseInteraction, { InteractionCtor } from '../interaction/index';
import {
  IValueAxis,
  Axis,
  IDescription,
  IInteractions,
  ITitle,
  Label,
  Legend,
  StateConfig,
  Tooltip,
  DataItem,
  Animation,
  Meta,
  GuideLineConfig,
  CustomTooltipConfig,
} from '../interface/config';
import { G2Config } from '../interface/config';
import { EVENT_MAP, onEvent } from '../util/event';
import PaddingController from './controller/padding';
import StateController from './controller/state';
import ThemeController from './controller/theme';
import Layer, { LayerConfig } from './layer';
import { isTextUsable } from '../util/common';
import { LooseMap } from '../interface/types';
import BBox, { DIRECTION } from '../util/bbox';
import { VIEW_LAYER_LIFE_CYCLE } from './constants';

export interface ViewConfig {
  renderer?: string;
  data?: DataItem[];
  meta?: LooseMap<Meta>;
  padding?: number | number[] | string;
  xField?: string;
  yField?: string;
  color?: string | string[] | {};
  xAxis?: Axis;
  yAxis?: Axis;
  label?: Label | any;
  tooltip?: Tooltip;
  legend?: Legend;
  animation?: Animation | boolean;
  theme?: LooseMap | string;
  responsiveTheme?: {} | string;
  interactions?: IInteractions[];
  responsive?: boolean;
  title?: ITitle;
  description?: IDescription;
  guideLine?: GuideLineConfig[];
  events?: {
    [k: string]: ((...args: any[]) => any) | boolean;
  };
  defaultState?: {
    active?: StateConfig;
    inActive?: StateConfig;
    selected?: StateConfig;
    disabled?: StateConfig;
  };
  name?: string;
}

export interface ViewLayerConfig extends ViewConfig, LayerConfig {}

export default abstract class ViewLayer<T extends ViewLayerConfig = ViewLayerConfig> extends Layer<T> {
  public static getDefaultOptions(): Partial<ViewConfig> {
    return {
      renderer: 'canvas',
      title: {
        visible: false,
        alignTo: 'left',
        text: '',
      },
      description: {
        visible: false,
        text: '',
        alignTo: 'left',
      },
      padding: 'auto',
      legend: {
        visible: true,
        position: 'bottom-center',
      },
      tooltip: {
        visible: true,
        shared: true,
        showCrosshairs: true,
        crosshairs: {
          type: 'x',
        },
        offset: 20,
      },
      xAxis: {
        visible: true,
        grid: {
          visible: false,
        },
        line: {
          visible: true,
        },
        tickLine: {
          visible: true,
        },
        label: {
          visible: true,
          autoRotate: true,
          autoHide: true,
        },
        title: {
          visible: false,
          spacing: 12,
        },
      },
      yAxis: {
        visible: true,
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
          autoHide: true,
          autoRotate: false,
        },
        title: {
          autoRotate: true,
          visible: false,
          spacing: 12,
        },
      },
      label: {
        visible: false,
      },
      interactions: [{ type: 'tooltip' }, { type: 'legend-active' }, { type: 'legend-filter' }],
      animation: true,
    };
  }
  public type: string;
  public view: View;
  public theme: any;
  public initialOptions: T;
  public title: TextDescription;
  public description: TextDescription;
  public viewRange: BBox;
  protected paddingController: PaddingController;
  protected stateController: StateController;
  protected themeController: ThemeController;
  public config: G2Config;
  protected interactions: Interaction[] = [];
  protected labels: BaseLabel[] = [];

  constructor(props: T) {
    super(props);
    this.options = this.getOptions(props);
    this.initialOptions = deepMix({}, this.options);
    this.paddingController = new PaddingController({
      plot: this,
    });
    this.stateController = new StateController({
      plot: this,
    });
    this.themeController = new ThemeController();
  }

  public getOptions(props: Partial<T>): T {
    const curOptions = this.options || {};
    const options = super.getOptions(props);
    // @ts-ignore
    const defaultOptions = this.constructor.getDefaultOptions(props);
    // interactions 需要合并去重下，如果有更新 interactions，需要去掉当前的 interactions 配置
    const interactions = reduce(
      flatten(
        map([options, defaultOptions, hasKey(props, 'interactions') ? props : curOptions], (src) =>
          get(src, 'interactions', [])
        )
      ),
      (result, cur) => {
        const idx = findIndex(result, (item) => item.type === cur.type);
        if (idx >= 0) {
          result.splice(idx, 1);
        }
        return [...result, cur];
      },
      []
    );
    return deepMix({}, options, defaultOptions, curOptions, props, { interactions });
  }

  public beforeInit() {
    this.emit(VIEW_LAYER_LIFE_CYCLE.BEFORE_INIT);
    super.beforeInit();
  }

  public init() {
    super.init();
    this.theme = this.themeController.getTheme(this.options, this.type);
    this.config = {
      data: this.processData(this.options.data),
      scales: {},
      legends: {},
      tooltip: {
        showTitle: true,
      },
      axes: {},
      coordinate: { type: 'cartesian' },
      geometries: [],
      annotations: [],
      interactions: [],
      theme: this.theme,
      panelRange: {},
      animate: {} as any,
      views: [],
    };

    this.paddingController.clear();

    this.drawTitle();
    this.drawDescription();
    // 有些interaction要调整配置项，所以顺序提前
    this.interaction();
    this.coord();
    this.scale();
    this.axis();
    this.tooltip();
    this.legend();
    this.addGeometry();
    this.annotation();
    this.animation();

    this.viewRange = this.getViewRange();
    const region = this.viewRangeToRegion(this.viewRange);
    this.view = new View({
      parent: null,
      canvas: this.canvas,
      backgroundGroup: this.container.addGroup(),
      middleGroup: this.container.addGroup(),
      foregroundGroup: this.container.addGroup(),
      padding: this.paddingController.getPadding(),
      theme: this.theme,
      options: this.config,
      limitInPlot: this.isLimitInPlot(),
      region,
    });
    this.applyInteractions();
    this.view.on(VIEW_LIFE_CIRCLE.AFTER_RENDER, () => {
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
    this.emit(VIEW_LAYER_LIFE_CYCLE.AFTER_INIT);
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
    if (options.tooltip?.custom?.onChange && options.padding !== 'auto') {
      this.customTooltip();
    }
  }

  /** 完整生命周期渲染 */
  public render(): void {
    this.emit(VIEW_LAYER_LIFE_CYCLE.BEFORE_RENDER);
    super.render();
    const { data } = this.options;
    if (!isEmpty(data)) {
      this.view.render();
    }
    this.emit(VIEW_LAYER_LIFE_CYCLE.AFTER_RENDER);
  }

  /** 画布重绘 */
  public repaint(): void {
    if (this.canvas) {
      this.canvas.draw();
    }
  }

  public getScaleByField(field: string) {
    return this.view.getScaleByField(field);
  }

  public getXScale() {
    const { xField } = this.options;
    if (xField) {
      return this.view.getScaleByField(xField);
    }
  }

  public getYScale() {
    const { yField } = this.options;
    if (yField) {
      return this.view.getScaleByField(yField);
    }
  }

  public getColorScale() {
    const options: any = this.options;
    if (contains(options, 'colorField')) {
      return this.view.getScaleByField(options);
    }
  }

  public getShapes() {
    const geometries = this.view.geometries;
    const shapes = {};
    // todo: geometry 类型转译
    each(geometries, (geom) => {
      const { type } = geom;
      shapes[type] = geom.getShapes();
    });
    return shapes;
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
    this.options = this.getOptions(cfg);
    this.processOptions(this.options);
  }

  public changeData(data: DataItem[]): void {
    this.emit(VIEW_LAYER_LIFE_CYCLE.BEFORE_CHANGE_DATA);
    const isEmptyBefore = isEmpty(this.options.data);
    this.options.data = this.processData(data);

    // 如果之前没有 data
    if (isEmptyBefore) {
      this.options.padding = this.initialOptions.padding || 'auto';
      this.view.data(this.options.data);
      this.view.render();
    } else {
      this.view.changeData(this.options.data);
    }

    this.emit(VIEW_LAYER_LIFE_CYCLE.AFTER_CHANGE_DATA);
  }

  // plot 不断销毁重建，需要一个api获取最新的plot
  public getPlot() {
    return this.view;
  }

  /**
   * 获取已渲染的数据标签组件
   */
  public getLabels() {
    return this.labels;
  }

  // 获取对应的G2 Theme
  public getTheme() {
    if (!this.theme) {
      return this.themeController.getTheme(this.options, this.type);
    }
    return this.theme;
  }

  public getResponsiveTheme() {
    return this.themeController.getResponsiveTheme(this.type);
  }

  // 获取对应的Plot Theme
  public getPlotTheme() {
    return this.themeController.getPlotTheme(this.options, this.type);
  }

  public getInteractions() {
    return this.interactions;
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

  public setDefault(condition, style) {
    this.stateController.setState({ type: 'default', condition, style });
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
    const scaleTypes = mapValues(this.config.scales, (scaleConfig: any) => {
      const type = scaleConfig.type;
      return type ? { type } : {};
    });
    const scales = deepMix({}, this.config.scales, this.options.meta || {}, scaleTypes);

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
    const axesConfig = {};
    axesConfig[this.options.xField] = xAxis_parser;
    axesConfig[this.options.yField] = yAxis_parser;
    /** 存储坐标轴配置项到config */
    this.setConfig('axes', axesConfig);
  }

  protected tooltip(): void {
    if (this.options.tooltip.visible === false) {
      this.setConfig('tooltip', false);
      return;
    }
    const tooltipOptions = get(this.options, 'tooltip');
    if (tooltipOptions.custom?.container) {
      tooltipOptions.container = tooltipOptions.custom.container;
    }
    if (tooltipOptions.custom?.customContent) {
      tooltipOptions.customContent = tooltipOptions.custom.customContent;
    }
    this.setConfig('tooltip', deepMix({}, tooltipOptions));

    deepMix(this.config.theme.tooltip, this.options.tooltip.domStyles);
  }

  protected customTooltip() {
    const customContentCfg = this.options.tooltip.custom;
    let container;
    if (customContentCfg.container) {
      container = isString(customContentCfg.container)
        ? document.getElementById(customContentCfg.container)
        : customContentCfg.container;
    }
    this.view.on('tooltip:show', () => {
      if (!customContentCfg.container) {
        container = this.canvas.cfg.container.getElementsByClassName('g2-tooltip')[0];
      }
    });
    this.view.hideTooltip();
    this.view.on('tooltip:change', (ev: CustomTooltipConfig) => {
      if (container) {
        customContentCfg.onChange(container, ev);
      }
    });
  }

  protected getLegendPosition(position: string): any {
    const positionList = position.split('-');
    // G2 4.0 兼容 XXX-center 到 XXX 的场景
    if (positionList && positionList.length > 1 && positionList[1] === 'center') {
      return positionList[0];
    }
    return position;
  }

  protected legend(): void {
    if (this.options.legend.visible === false) {
      this.setConfig('legends', false);
      return;
    }
    const options = deepMix({}, this.theme.legend, this.options.legend);
    const legendConfig = {
      position: this.getLegendPosition(get(options, 'position')),
      offsetX: get(options, 'offsetX'),
      offsetY: get(options, 'offsetY'),
      flipPage: get(options, 'flipPage'),
      marker: get(options, 'marker'),
      title: options.title?.visible ? get(options, 'title') : null,
      itemName: get(options, 'text'),
    };

    this.setConfig('legends', legendConfig);
  }

  protected annotation() {
    const config = [];
    if (this.config.coordinate.type === 'cartesian' && this.options.guideLine) {
      each(this.options.guideLine, (line) => {
        const guideLine = getComponent('guideLine', {
          plot: this,
          cfg: line,
        });
        config.push(guideLine);
      });
    }
    this.setConfig('annotations', config);
  }

  protected abstract addGeometry(): void;
  protected abstract geometryParser(dim: string, type: string): string;

  protected interaction() {
    const { interactions = [] } = this.options;
    each(interactions, (interaction) => {
      const { type } = interaction;
      if (type === 'slider' || type === 'scrollbar') {
        const axisConfig = {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        };
        this.options.xAxis = deepMix({}, this.options.xAxis, axisConfig);
      }
      this.setConfig('interaction', interaction);
    });
  }

  protected animation() {
    if (this.options.animation === false) {
      this.setConfig('animate', false);
    }
  }

  protected applyInteractions(): void {
    let range = BBox.fromBBoxObject(this.layerBBox);

    // 临时去掉 title/description 的占用
    const titleOrDesc = this.title || this.description;
    const extraBBox = new BBox(range.minX, range.minY, range.width, titleOrDesc ? titleOrDesc.getBBox().maxY : 0);
    range = range.cut(extraBBox, DIRECTION.TOP);

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
          Ctor.getInteractionRange(range, interaction.cfg),
          interaction.cfg
        );
        inst.render();
        this.interactions.push(inst);
      }
    });
  }

  /** 设置G2 config，带有类型推导 */
  protected setConfig<K extends keyof G2Config>(key: K, config: G2Config[K] | boolean): void {
    if (key === 'geometry') {
      this.config.geometries.push(config as G2Config['geometry']);
      return;
    }
    if (key === 'interaction') {
      this.config.interactions.push(config as any);
      return;
    }
    if (config === false) {
      this.config[key] = false;
      return;
    }
    assign(this.config[key], config);
  }

  protected parseEvents(eventParser?): void {
    const { options } = this;
    if (options.events) {
      super.parseEvents(options.events);
      const eventmap = eventParser ? eventParser.EVENT_MAP : EVENT_MAP;
      each(options.events, (e, k) => {
        if (isFunction(e)) {
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
        rightMargin: range.maxX - theme.title.padding[1],
        topMargin: range.minY + theme.title.padding[0],
        text: props.title.text,
        style: mix(theme.title, props.title.style),
        wrapperWidth: width - theme.title.padding[3] - theme.title.padding[1],
        container: this.container.addGroup() as any,
        theme,
        index: isTextUsable(props.description) ? 0 : 1,
        plot: this,
        alignTo: props.title.alignTo,
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
        rightMargin: range.maxX - theme.title.padding[1],
        text: props.description.text,
        style: mix(theme.description, props.description.style),
        wrapperWidth: width - theme.description.padding[3] - theme.description.padding[1],
        container: this.container.addGroup() as any,
        theme,
        index: 1,
        plot: this,
        alignTo: props.description.alignTo,
        name: 'description',
      });
      this.description = description;
      this.paddingController.registerPadding(description, 'outer');
    }
  }

  protected doRenderLabel(geometry: Geometry, label: Label) {
    each(this.labels, (item) => {
      item.destroy();
    });
    this.labels = [];
    const config: LabelComponentConfig = {
      layer: this,
      container: geometry.labelsContainer,
      geometry,
      label,
    };
    const Ctor = getLabelComponent(label.type);
    if (Ctor) {
      const label = new Ctor(config);
      label.init();
      label.render();
      this.labels.push(label);
    }
  }

  /** 抽取destroy和updateConfig共有代码为_destroy方法 */
  private doDestroy() {
    this.doDestroyInteractions();
    this.doDestroyLabels();
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

  private doDestroyLabels() {
    // 移除各 geometry 的 label
    each(this.labels, (label: BaseLabel) => {
      label.destroy();
    });
    this.labels = [];
  }

  protected getViewRange() {
    // 有 Range 的 Interaction 参与 ViewMargin 计算
    const { interactions = [] } = this.options;
    // const layerBBox = this.layerBBox;
    const layerBBox = this.paddingController.processOuterPadding();
    interactions.forEach((interaction) => {
      const Ctor: InteractionCtor | undefined = BaseInteraction.getInteraction(interaction.type, this.type);
      const range: BBox | undefined = Ctor && Ctor.getInteractionRange(layerBBox, interaction.cfg);
      let position = '';
      if (range) {
        // 先只考虑 Range 靠边的情况
        if (range.maxY === layerBBox.maxY && range.minY > layerBBox.minY) {
          // margin[2] += range.height;
          position = 'bottom';
        } else if (range.maxX === layerBBox.maxX && range.minX > layerBBox.minX) {
          // margin[1] += range.width;
          position = 'right';
        } else if (range.minX === layerBBox.minX && range.maxX > layerBBox.maxX) {
          // margin[3] += range.width;
          position = 'left';
        } else if (range.minY === layerBBox.minY && range.maxY < layerBBox.maxY) {
          // margin[0] += range.height;
          position = 'top';
        }
        this.paddingController.registerPadding(
          {
            interaction: interaction.type,
            name: interaction.type,
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

  protected isLimitInPlot() {
    const yAxisOptions = this.options.yAxis as IValueAxis;
    if (
      hasKey(yAxisOptions, 'max') ||
      hasKey(yAxisOptions, 'min') ||
      hasKey(yAxisOptions, 'maxLimit') ||
      hasKey(yAxisOptions, 'minLimit')
    ) {
      return true;
    }
    return false;
  }

  private viewRangeToRegion(viewRange) {
    const { x, y, width, height } = this;
    const start = { x: 0, y: 0 },
      end = { x: 1, y: 1 };
    start.x = viewRange.minX / (x + width);
    start.y = viewRange.minY / (y + height);
    end.x = viewRange.maxX / (x + width);
    end.y = viewRange.maxY / (y + height);

    return {
      start,
      end,
    };
  }
}
