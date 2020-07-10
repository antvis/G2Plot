import { deepMix, isNil, map, some, every } from '@antv/util';
import * as EventParser from './event';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { DataItem, Label, GraphicStyle } from '../../interface/config';
import { getGeom } from '../../geoms/factory';
import { LayerConfig } from '../../base/layer';
import { getPieLabel, PieLabelConfig } from './component/label';
import SpiderLabel from './component/label/spider-label';
import { registerPlotType } from '../../base/global';
import PieBaseLabel from './component/label/base-label';
import { processEmpty, getOriginKey } from './utils';
import './theme';

export interface PieViewConfig extends ViewConfig {
  angleField: string;
  colorField?: string;
  radius?: number;
  pieStyle?: GraphicStyle | ((...args: any[]) => GraphicStyle);
  label?: PieLabelConfig;
}

export interface PieLayerConfig extends PieViewConfig, LayerConfig {}

const G2_GEOM_MAP = {
  pie: 'interval',
};

const PLOT_GEOM_MAP = {
  pie: 'column',
};

// @ts-ignore
export default class PieLayer<T extends PieLayerConfig = PieLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): any {
    return deepMix({}, super.getDefaultOptions(), {
      width: 400,
      height: 400,
      title: {
        visible: false,
      },
      description: {
        visible: false,
      },
      forceFit: true,
      padding: 'auto',
      radius: 0.8,
      label: {
        visible: true,
        type: 'inner',
        autoRotate: false,
        adjustPosition: true,
        allowOverlap: false,
        line: {
          visible: true,
          smooth: true,
        },
      },
      legend: {
        visible: true,
        position: 'right-center',
      },
      tooltip: {
        visible: true,
        shared: false,
        showCrosshairs: false,
        showMarkers: false,
      },
      pieStyle: {
        stroke: 'white',
        lineWidth: 1,
      },
    });
  }

  public pie: any;
  public type: string = 'pie';
  public labelComponent: SpiderLabel | PieBaseLabel;

  public afterRender() {
    super.afterRender();
    const options = this.options;
    /** 蜘蛛布局label */
    if (options.label && options.label.visible) {
      // 清除，避免二次渲染
      if (this.labelComponent) {
        this.labelComponent.clear();
      }
      const labelConfig = options.label as Label;
      if (labelConfig.type === 'spider') {
        this.labelComponent = new SpiderLabel({
          view: this.view,
          fields: options.colorField ? [options.angleField, options.colorField] : [options.angleField],
          ...this.options.label,
        });
        this.labelComponent.render();
      } else {
        const LabelCtor = getPieLabel(labelConfig.type);
        this.labelComponent = new LabelCtor(this, options.label);
        this.labelComponent.render();
      }
    }
  }

  public getAngleScale() {
    const { angleField } = this.options;
    if (angleField) {
      return this.view.getScaleByField(angleField);
    }
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected scale() {
    const props = this.options;
    super.scale();
    let scales = {};
    scales[props.angleField] = {};
    scales[props.colorField] = { type: 'cat' };
    scales = deepMix({}, this.config.scales, scales);
    this.setConfig('scales', scales);
  }

  protected processData(data?: DataItem[]): DataItem[] | undefined {
    const key = this.options.angleField;
    const originalKey = getOriginKey(key);
    const originalData = data.map((item) => {
      const originalValue = typeof item[key] === 'string' ? Number.parseFloat(item[key] as 'string') : item[key];
      return {
        ...item,
        [key]: originalValue,
        [originalKey]: originalValue,
      };
    });

    const getValue = (d: DataItem) => d[key];
    const notEqualZeroOrNil = (v: number) => v !== 0 && !isNil(v);
    const allAngleValue = map(originalData, getValue);
    const allNil = every(allAngleValue, isNil);
    /** 数据全空处理，同时处理 meta */
    if (!some(allAngleValue, notEqualZeroOrNil)) {
      const meta = this.options.meta || {};
      // 数据全为 null
      if (allNil) {
        this.options.meta = deepMix({}, meta, { [key]: { formatter: () => 'null' } });
        return processEmpty(originalData, key);
      } else {
        // 数据不全为 null，部分 0 部分 null（null值不展示）
        this.options.meta = deepMix({}, meta, { [key]: { formatter: () => '0' } });
        return processEmpty(originalData, key, (v) => (v === 0 ? 1 : v));
      }
    }
    return originalData;
  }

  protected axis() {
    return;
  }

  protected coord() {
    const props = this.options;
    const coordConfig: any = {
      type: 'theta',
      cfg: {
        radius: props.radius,
        // @ts-ignore 业务定制,不开放配置
        innerRadius: props.innerRadius || 0,
      },
    };
    this.setConfig('coordinate', coordConfig);
  }

  protected addGeometry() {
    const props = this.options;
    const pie = getGeom('interval', 'main', {
      plot: this,
      positionFields: [1, props.angleField],
    });
    pie.adjust = [{ type: 'stack' }];
    this.pie = pie;
    if (props.label) {
      this.label();
    }
    if (props.tooltip && (props.tooltip.fields || props.tooltip.formatter)) {
      this.geometryTooltip();
    }
    this.setConfig('geometry', pie);
  }

  protected geometryTooltip() {
    this.pie.tooltip = {};
    const tooltipOptions: any = this.options.tooltip;
    if (tooltipOptions.fields) {
      this.pie.tooltip.fields = tooltipOptions.fields;
    }
    if (tooltipOptions.formatter) {
      this.pie.tooltip.callback = tooltipOptions.formatter;
      if (!tooltipOptions.fields) {
        this.pie.tooltip.fields = [this.options.angleField, this.options.colorField];
      }
    }
  }

  protected animation() {
    super.animation();
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.pie.animate = false;
    }
  }

  protected annotation() {
    return;
  }

  protected parseEvents(eventParser?) {
    if (eventParser) {
      super.parseEvents(eventParser);
    } else {
      super.parseEvents(EventParser);
    }
  }

  private label() {
    // 不使用 g2 内置label
    this.pie.label = false;
  }
}

registerPlotType('pie', PieLayer);
