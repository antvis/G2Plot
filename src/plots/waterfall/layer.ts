/**
 * Create By Bruce Too
 * On 2020-02-18
 */
import { deepMix, get, map, isArray, reduce, has, isFunction, isString, isObject } from '@antv/util';
import { registerPlotType } from '../../base/global';
import './geometry/shape/waterfall';
import { ElementOption, DataItem, LayerConfig } from '../..';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { extractScale } from '../../util/scale';
import { AttributeCfg } from '@antv/attr';
import { getComponent } from '../../components/factory';
import * as EventParser from './event';
import './component/label/waterfall-label';
import DiffLabel, { DiffLabelcfg } from './component/label/diff-label';
import { LineStyle, TextStyle, GraphicStyle } from '../../interface/config';
import { getGeometryByType } from '../../util/view';

const G2_GEOM_MAP = {
  waterfall: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'waterfall',
};

export const VALUE_FIELD = '$$value$$';
export const IS_TOTAL = '$$total$$';
export const INDEX_FIELD = '$$index$$';

export interface WaterfallViewConfig extends ViewConfig {
  showTotal?: {
    visible: boolean;
    label: string;
  };
  /** 差值label */
  diffLabel?: {
    visible: boolean;
    style?: TextStyle;
    formatter?: DiffLabelcfg['formatter'];
  };
  leaderLine?: {
    visible: boolean;
    style?: LineStyle;
  };
  color?:
    | string
    | { rising: string; falling: string; total?: string }
    | ((type: string, value: number | null, values: number | number[], index: number) => string);
  waterfallStyle?: GraphicStyle | ((...args: any[]) => GraphicStyle);
}

export interface WaterfallLayerConfig extends WaterfallViewConfig, LayerConfig {}

export default class WaterfallLayer extends ViewLayer<WaterfallLayerConfig> {
  public waterfall;
  public type: string = 'watarfall';
  public diffLabel;

  public static getDefaultOptions(): Partial<WaterfallLayerConfig> {
    return deepMix({}, super.getDefaultOptions(), {
      legend: {
        visible: false,
        position: 'bottom',
      },
      label: {
        visible: true,
        adjustPosition: true,
      },
      /** 差值 label */
      diffLabel: {
        visible: true,
      },
      /** 迁移线 */
      leaderLine: {
        visible: true,
      },
      /** 显示总计 */
      showTotal: {
        visible: true,
        label: '总计值',
      },
      waterfallStyle: {
        /** 默认无描边 */
        lineWidth: 0,
      },
      tooltip: {
        visible: true,
        shared: true,
        showCrosshairs: false,
        showMarkers: false,
      },
    });
  }

  public getOptions(props: WaterfallLayerConfig) {
    const options = super.getOptions(props);
    this.adjustLegendOptions(options);
    this.adjustMeta(options);
    return options;
  }

  public afterInit() {
    super.afterInit();
    const options = this.options;
    if (options.diffLabel && options.diffLabel.visible) {
      this.diffLabel = new DiffLabel({
        view: this.view,
        fields: [options.xField, options.yField, VALUE_FIELD],
        formatter: options.diffLabel.formatter,
        style: options.diffLabel.style,
      });
    } else if (this.diffLabel) {
      this.diffLabel.clear();
      this.diffLabel = null;
    }
  }

  public afterRender() {
    super.afterRender();
    const options = this.options;
    this.view.on('tooltip:change', (e) => {
      const { items } = e;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const data = get(item, 'data', {});
        // 改变 tooltip 显示的name和value
        item.name = data[options.xField];
        item.value = data[options.yField];
        if (!item.value && data[IS_TOTAL]) {
          const values = data[VALUE_FIELD];
          item.value = values[0] - values[1];
        }
        e.items[i] = item;
      }
    });
    this.renderLabel();
  }

  protected renderLabel() {
    const geometry = getGeometryByType(this.view, 'interval');
    if (this.options.label && this.options.label.visible) {
      this.doRenderLabel(geometry, {
        type: 'waterfall',
        ...this.options.label,
      });
    }
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected interaction() {
    this.setConfig('interactions', [{ type: 'tooltip' }, { type: 'active-region' }]);
  }

  protected addGeometry() {
    const options = this.options;
    const waterfall: ElementOption = {
      type: 'interval',
      position: {
        fields: [options.xField, VALUE_FIELD],
      },
      shape: {
        values: ['waterfall'],
      },
    };
    waterfall.style = this._parseStyle();
    waterfall.color = this._parseColor();
    this.waterfall = waterfall;
    if (this.options.tooltip && (this.options.tooltip.fields || this.options.tooltip.formatter)) {
      this.geometryTooltip();
    }
    this.setConfig('geometry', waterfall);
  }

  protected processData(originData?: DataItem[]) {
    const plotData = [];
    const xField = this.options.xField;
    const yField = this.options.yField;
    map(originData, (dataItem, idx: number) => {
      let value: any = dataItem[yField];
      if (idx > 0) {
        const prevValue = plotData[idx - 1][VALUE_FIELD];
        if (isArray(prevValue)) {
          value = [prevValue[1], dataItem[yField] + prevValue[1]];
        } else {
          value = [prevValue, dataItem[yField] + prevValue];
        }
      }
      plotData.push({
        ...dataItem,
        [VALUE_FIELD]: value,
        [INDEX_FIELD]: idx,
      });
    });
    if (this.options.showTotal && this.options.showTotal.visible) {
      const values = map(originData, (o) => o[yField]);
      const totalValue = reduce(values, (p: number, n: number) => p + n, 0);
      plotData.push({
        [xField]: this.options.showTotal.label,
        [yField]: null,
        [VALUE_FIELD]: [totalValue, 0],
        [INDEX_FIELD]: plotData.length,
        [IS_TOTAL]: true,
      });
    }
    return plotData;
  }

  protected scale() {
    const { options } = this;
    const scales = {};
    /** 配置x-scale */
    scales[options.xField] = { type: 'cat' };
    if (has(options, 'xAxis')) {
      extractScale(scales[options.xField], options.xAxis);
    }
    /** 配置y-scale */
    scales[VALUE_FIELD] = {};
    if (has(options, 'yAxis')) {
      extractScale(scales[VALUE_FIELD], options.yAxis);
    }
    this.setConfig('scales', scales);
  }

  /** @override */
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
    axesConfig[VALUE_FIELD] = yAxis_parser;
    /** 存储坐标轴配置项到config */
    this.setConfig('axes', axesConfig);
  }

  protected coord() {
    return;
  }

  protected parseEvents() {
    super.parseEvents(EventParser);
  }

  protected geometryTooltip() {
    this.waterfall.tooltip = {};
    const tooltipOptions: any = this.options.tooltip;
    if (tooltipOptions.fields) {
      this.waterfall.tooltip.fields = tooltipOptions.fields;
    }
    if (tooltipOptions.formatter) {
      this.waterfall.tooltip.callback = tooltipOptions.formatter;
      if (!tooltipOptions.fields) {
        this.waterfall.tooltip.fields = [this.options.xField, VALUE_FIELD];
      }
    }
  }

  /** 牵引线的样式注入到style中 */
  private _parseStyle(): LineStyle {
    const style = this.options.waterfallStyle;
    const leaderLine = this.options.leaderLine;
    const config: Record<string, any> = {};
    if (isFunction(style)) {
      config.callback = (...args) => {
        return Object.assign({}, style(...args), { leaderLine });
      };
    } else {
      config.cfg = { ...style, leaderLine };
    }

    return config;
  }

  private _parseColor(): AttributeCfg {
    const options = this.options;
    const { xField, yField } = this.options;
    const config: any = {
      fields: [xField, yField, VALUE_FIELD, INDEX_FIELD],
    };
    if (isFunction(options.color)) {
      config.callback = options.color;
    } else {
      let risingColor = '#f4664a';
      let fallingColor = '#30bf78';
      let totalColor = 'rgba(0, 0, 0, 0.25)';
      if (isString(options.color)) {
        risingColor = fallingColor = totalColor = options.color;
      } else if (isObject(options.color)) {
        const { rising, falling, total } = options.color;
        risingColor = rising;
        fallingColor = falling;
        totalColor = total;
      }
      config.callback = (type, value, values: number | number[], index: number) => {
        if (index === this.options.data.length) {
          return totalColor || (values[0] >= 0 ? risingColor : fallingColor);
        }
        return (isArray(values) ? values[1] - values[0] : values) >= 0 ? risingColor : fallingColor;
      };
    }
    return config as AttributeCfg;
  }

  /** 复写 legend 配置, 瀑布图默认无legend */
  private adjustLegendOptions(options): void {
    const legendOptions = options.legend;
    if (legendOptions) {
      legendOptions.visible = false;
    }
  }

  /** 复写 meta 配置 */
  private adjustMeta(options): void {
    const metaOptions = options.meta;
    if (metaOptions) {
      const valueFieldMeta = metaOptions ? metaOptions[options.yField] : {};
      valueFieldMeta.alias = valueFieldMeta.alias || options.yField;
      options.meta[VALUE_FIELD] = valueFieldMeta;
    }
  }
}

registerPlotType('waterfall', WaterfallLayer);
