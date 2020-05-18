/**
 * Create By Bruce Too
 * On 2020-02-17
 */
import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../..';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { Label } from '../..';
import * as EventParser from './event';
import { GraphicStyle } from '../../interface/config';

export interface RoseViewConfig extends ViewConfig {
  radiusField: string;
  categoryField: string;
  colorField?: string;
  radius?: number;
  innerRadius?: number;
  /** 每个扇形切片的样式 */
  sectorStyle?: GraphicStyle | ((...args: any[]) => GraphicStyle);
  label?: RoseLabel;
}

type RoseLabel = ViewConfig['label'] & {
  type: 'outer' | 'inner';
  /** 自动调整颜色 */
  adjustColor?: boolean;
  /** 自动旋转 */
  autoRotate?: boolean;
  // label的内容，如果不配置，读取scale中的第一个field对应的值  G2 4.0 就这样实现的
  content?: string | ((...args: any[]) => string);
};

export interface RoseLayerConfig extends RoseViewConfig, LayerConfig {}

const G2_GEOM_MAP = {
  rose: 'interval',
};

const PLOT_GEOM_MAP = {
  rose: 'column',
};

export default class RoseLayer<T extends RoseLayerConfig = RoseLayerConfig> extends ViewLayer<T> {
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
      innerRadius: 0,
      label: {
        visible: true,
        type: 'inner',
        autoRotate: true,
        adjustColor: false,
      },
      legend: {
        visible: true,
        position: 'right',
      },
      tooltip: {
        visible: true,
        shared: false,
        showCrosshairs: false,
        showMarkers: false,
      },
      columnStyle: {
        stroke: 'white',
        lineWidth: 1,
      },
      xAxis: {
        visible: false,
        line: {
          visible: false,
        },
        tickLine: {
          visible: false,
        },
        grid: {
          visible: true,
          alignTick: false,
          style: {
            lineWidth: 0.5,
          },
        },
        label: {
          offset: 5,
          autoRotate: true,
        },
      },
      yAxis: {
        visible: false,
      },
    });
  }

  public rose: any;
  public type: string = 'rose';

  public getOptions(props: T) {
    const options = super.getOptions(props);
    const columnStyle = props.sectorStyle;
    const xField = props.categoryField;
    const yField = props.radiusField;
    return deepMix({}, options, { columnStyle, xField, yField });
  }

  public getRadiusScale() {
    const { radiusField } = this.options;
    if (radiusField) {
      this.view.getScaleByField(radiusField);
    }
  }

  public getAngleScale() {
    const { categoryField } = this.options;
    if (categoryField) {
      this.view.getScaleByField(categoryField);
    }
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected scale() {
    // super.scale();
    const props = this.options;
    const scales = {};
    scales[props.radiusField] = {};
    scales[props.categoryField] = { type: 'cat' };
    this.setConfig('scales', scales);
  }

  /** 不显示坐标轴 */
  /*protected axis() {
    super.axis();
    const options = this.options;
    if (!options.stackField && !options.groupField) {
      this.setConfig('axes', false);
    }
  }*/

  protected coord() {
    const props = this.options;
    const coordConfig = {
      type: 'polar',
      cfg: {
        radius: props.radius,
        innerRadius: props.innerRadius || 0,
      },
    };
    this.setConfig('coordinate', coordConfig as any);
  }

  protected addGeometry() {
    const options = this.options;
    const rose = getGeom('interval', 'main', {
      plot: this,
      positionFields: [options.categoryField, options.radiusField],
      widthRatio: {
        rose: 1,
      },
    });
    rose.label = this.extractLabel();
    rose.adjust = this.adjustRoseAdjust();
    this.rose = rose;
    if (options.tooltip && (options.tooltip.fields || options.tooltip.formatter)) {
      this.geometryTooltip();
    }
    this.setConfig('geometry', rose);
  }

  protected adjustRoseAdjust() {
    return;
  }

  protected geometryTooltip() {
    this.rose.tooltip = {};
    const tooltipOptions: any = this.options.tooltip;
    if (tooltipOptions.fields) {
      this.rose.tooltip.fields = tooltipOptions.fields;
    }
    if (tooltipOptions.formatter) {
      this.rose.tooltip.callback = tooltipOptions.formatter;
      if (!tooltipOptions.fields) {
        this.rose.tooltip.fields = [this.options.radiusField, this.options.categoryField, this.options.colorField];
      }
    }
  }

  protected animation() {
    super.animation();
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.rose.animate = false;
    }
  }

  protected annotation() {
    return;
  }

  protected parseEvents() {
    super.parseEvents(EventParser);
  }

  protected extractLabel() {
    const options = this.options;
    if (!options.label || !options.label.visible) {
      return false;
    }
    const label = deepMix({}, options.label as Label);
    this.adjustLabelOptions(label);
    const fields = [options.categoryField, options.radiusField];
    const labelConfig = getComponent('label', {
      plot: this,
      labelType: 'polar',
      fields,
      ...label,
    });
    return labelConfig;
  }

  private adjustLabelOptions(labelOptions: RoseLabel) {
    const { radiusField } = this.options;
    if (labelOptions) {
      const { offset, type, content } = labelOptions;
      if (type === 'inner') {
        labelOptions.offset = offset < 0 ? offset : -10;
      } else if (type === 'outer') {
        labelOptions.offset = offset >= 0 ? offset : 10;
      }
      if (!content) {
        // 默认显示 数值
        labelOptions.content = (text, item) => `${item._origin[radiusField]}`;
      }
    }
  }
}

registerPlotType('rose', RoseLayer);
