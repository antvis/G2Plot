import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getGeom } from '../../geoms/factory';
import { ICatAxis, ITimeAxis, IValueAxis, Label, DataItem } from '../../interface/config';
import { extractScale } from '../../util/scale';
import Quadrant, { QuadrantConfig } from './components/quadrant';
import Trendline, { TrendlineConfig } from './components/trendline';
import * as EventParser from './event';
import { getComponent } from '../../components/factory';

export interface PointStyle {
  /** 圆边颜色 */
  stroke: string;
  /** 圆边大小 */
  lineWidth?: number;
  /** 圆边透明度 */
  strokeOpacity?: number;
  /** 填充透明度 */
  fillOpacity?: number;
  /** 整体透明度 */
  opacity?: number;
}

const G2_GEOM_MAP = {
  scatter: 'point',
};

const PLOT_GEOM_MAP = {
  point: 'point',
};

export interface PointViewConfig extends ViewConfig {
  /** 散点样式 */
  pointStyle?: PointStyle | ((...args: any) => PointStyle);
  /** 颜色字段 */
  colorField?: string | string[];
  /** x 轴配置 */
  xAxis?: ICatAxis | ITimeAxis | IValueAxis;
  /** y 轴配置 */
  yAxis?: ICatAxis | ITimeAxis | IValueAxis;
  quadrant?: QuadrantConfig;
  trendline?: TrendlineConfig;
}

export interface ScatterViewConfig extends PointViewConfig {
  /** 散点大小 */
  pointSize?: number | any;
}

export interface ScatterLayerConfig extends ScatterViewConfig, LayerConfig {}

export default class ScatterLayer<T extends ScatterLayerConfig = ScatterLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      pointSize: 4,
      pointStyle: {
        strokeOpacity: 1,
        fillOpacity: 0.4,
        opacity: 0.65,
      },
      xAxis: {
        nice: true,
        grid: {
          visible: true,
        },
        line: {
          visible: true,
        },
      },
      yAxis: {
        nice: true,
        grid: {
          visible: true,
        },
        line: {
          visible: true,
        },
      },
      tooltip: {
        visible: true,
        // false 会造成 tooltip 只能显示一条数据，true 会造成 tooltip 在空白区域也会显示
        shared: null,
        showMarkers: false,
        showCrosshairs: false,
      },
      label: {
        visible: false,
        position: 'top',
      },
      shape: 'circle',
    });
  }

  public type: string = 'scatter';
  public points: any;
  protected quadrant: Quadrant;
  protected trendline: Trendline;

  public afterRender() {
    super.afterRender();
    if (this.options.quadrant && this.options.quadrant.visible && !this.quadrant) {
      if (this.quadrant) {
        this.quadrant.destroy();
      }
      this.quadrant = new Quadrant({
        view: this.view,
        plotOptions: this.options,
        ...this.options.quadrant,
      });
      this.quadrant.render();
    }
    if (this.options.trendline && this.options.trendline.visible) {
      if (this.trendline) {
        this.trendline.destroy();
      }
      this.trendline = new Trendline({
        view: this.view,
        plotOptions: this.options,
        ...this.options.trendline,
      });
      this.trendline.render();
    }
  }

  public destroy() {
    if (this.quadrant) {
      this.quadrant.destroy();
      this.quadrant = null;
    }
    if (this.trendline) {
      this.trendline.destroy();
      this.trendline = null;
    }
    super.destroy();
  }

  private isValidLinearValue(value) {
    if (_.isNil(value)) {
      return false;
    } else if (Number.isNaN(Number(value))) {
      return false;
    }
    return true;
  }

  protected processData(data?: DataItem[]): DataItem[] | undefined {
    const { xField, yField } = this.options;
    const xAxisType = _.get(this.options, ['xAxis', 'type'], 'linear');
    const yAxisType = _.get(this.options, ['yAxis', 'type'], 'linear');
    return data
      .filter((item) => {
        if (xAxisType === 'linear' && !this.isValidLinearValue(item[xField])) {
          return false;
        }
        if (yAxisType === 'linear' && !this.isValidLinearValue(item[yField])) {
          return false;
        }
        return true;
      })
      .map((item) => {
        return {
          ...item,
          [xField]: xAxisType === 'linear' ? Number(item[xField]) : String(item[xField]),
          [yField]: yAxisType === 'linear' ? Number(item[yField]) : String(item[yField]),
        };
      });
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected scale() {
    const props = this.options;
    const scales = {};
    /** 配置x-scale */
    scales[props.xField] = {};
    if (_.has(props, 'xAxis')) {
      extractScale(scales[props.xField], props.xAxis);
    }
    /** 配置y-scale */
    scales[props.yField] = {};
    if (_.has(props, 'yAxis')) {
      extractScale(scales[props.yField], props.yAxis);
    }
    this.setConfig('scales', scales);
    super.scale();
  }

  protected coord() {}

  protected annotation() {}

  protected addGeometry() {
    const points = getGeom('point', 'circle', {
      plot: this,
    });
    this.points = points;
    if (this.options.tooltip && this.options.tooltip.visible) {
      this.points.tooltip = this.extractTooltip();
      this.setConfig('tooltip', {
        showTitle: false,
        ...this.options.tooltip,
      } as any);
    }
    if (this.options.label) {
      this.label();
    }
    this.setConfig('geometry', points);
  }

  protected label() {
    const props = this.options;

    if (props.label.visible === false) {
      if (this.points) {
        this.points.label = false;
      }
      return;
    }

    const label = getComponent('label', {
      fields: [props.yField],
      plot: this,
    });

    if (this.points) {
      this.points.label = label;
    }
  }

  protected animation() {
    super.animation();
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.points.animate = false;
    }
  }

  protected parseEvents(eventParser) {
    // 气泡图继承散点图时，会存在 eventParser
    super.parseEvents(eventParser || EventParser);
  }

  protected extractTooltip() {
    const props = this.options;
    return {
      fields: [props.xField, props.yField],
    };
  }
}

registerPlotType('scatter', ScatterLayer);
