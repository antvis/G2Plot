/**
 * Create By Bruce Too
 * On 2020-02-17
 */
import { CoordinateType } from '@antv/g2/lib/plot/interface';
import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../..';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { Label } from '../..';
import * as EventParser from './event';
import { LineStyle } from '../line/layer';

interface RoseStyle extends LineStyle {
  stroke?: string;
  lineWidth?: number;
}

export interface RoseViewConfig extends ViewConfig {
  radiusField: string;
  categoryField: string;
  colorField?: string;
  stackField?: string;
  groupField?: string;
  radius?: number;
  innerRadius?: number;
  /** 每个扇形切片的样式 */
  sectorStyle?: RoseStyle | ((...args: any[]) => RoseStyle);
  label?: RoseLabel;
}

type RoseLabel = ViewConfig['label'] & {
  type: 'outer' | 'inner';
  /** 自动调整颜色 */
  adjustColor?: boolean;
  /** 自动旋转 */
  autoRotate?: boolean;
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
    return _.deepMix({}, super.getDefaultOptions(), {
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
        position: 'bottom-center',
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
        autoRotateLabel: true,
        line: {
          visible: false,
        },
        tickLine: {
          visible: false,
        },
        grid: {
          visible: true,
          style: {
            lineWidth: 0.5,
          },
        },
        label: {
          offset: 5,
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
    // @ts-ignore
    const defaultOptions = this.constructor.getDefaultOptions();
    const columnStyle = props.sectorStyle;
    const xField = props.categoryField;
    const yField = props.radiusField;
    return _.deepMix({}, options, defaultOptions, { columnStyle, xField, yField }, props);
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
  protected axis() {
    super.axis();
    const options = this.options;
    if (!options.stackField && !options.groupField) {
      this.setConfig('axes', false);
    }
  }

  protected coord() {
    const props = this.options;
    const coordConfig = {
      type: 'polar' as CoordinateType,
      cfg: {
        radius: props.radius,
        innerRadius: props.innerRadius || 0,
      },
    };
    this.setConfig('coordinate', coordConfig);
  }

  protected addGeometry() {
    const options = this.options;
    this.adjustColorFieldMapping();
    this.adjustLegendOptions();
    const rose = getGeom('interval', 'main', {
      plot: this,
      positionFields: [options.categoryField, options.radiusField],
      widthRatio: 1,
    });
    rose.label = this.extractLabel();
    rose.adjust = this.adjustRoseAdjust();
    this.rose = rose;
    this.setConfig('geometry', rose);
  }

  protected adjustColorFieldMapping() {
    const options = this.options;
    if (options.stackField || options.groupField) {
      this.options.colorField = null;
    }
  }

  protected adjustRoseAdjust() {
    if (this.options.stackField) {
      return [
        {
          type: 'stack',
        },
      ];
    } else if (this.options.groupField) {
      return [
        {
          type: 'dodge',
          marginRatio: 0,
        },
      ];
    }
    return null;
  }

  protected animation() {
    super.animation();
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.rose.animate = false;
    }
  }

  protected annotation() {}

  protected parseEvents(eventParser) {
    super.parseEvents(EventParser);
  }

  protected extractLabel() {
    const options = this.options;
    if (!options.label || !options.label.visible) {
      return false;
    }
    const label = _.deepMix({}, options.label as Label);
    this.adjustLabelOptions(label);
    const fields = [options.categoryField, options.radiusField];
    if (options.stackField || options.groupField) {
      fields.push(options.stackField || options.groupField);
    }
    const labelConfig = getComponent('label', {
      plot: this,
      // TODO change me to roseLabel
      labelType: 'polar',
      fields,
      ...label,
    });
    return labelConfig;
  }

  private adjustLabelOptions(labelOptions: RoseLabel) {
    const { radiusField } = this.options;
    if (labelOptions) {
      const { offset, type, formatter } = labelOptions;
      if (type === 'inner') {
        labelOptions.offset = offset < 0 ? offset : -10;
      } else if (type === 'outer') {
        labelOptions.offset = offset >= 0 ? offset : 10;
      }
      if (!formatter) {
        // 默认显示 数值
        labelOptions.formatter = (text, item) => `${item._origin[radiusField]}`;
      }
    }
  }

  private adjustLegendOptions() {
    const options = this.options;
    const legendOptions = options.legend;
    if (legendOptions) {
      if (!options.stackField && !options.groupField) {
        legendOptions.clickable = false;
      }
    }
  }
}

registerPlotType('rose', RoseLayer);
