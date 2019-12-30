import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getGeom } from '../../geoms/factory';
import { ICatAxis, ITimeAxis, IValueAxis } from '../../interface/config';
import { extractScale } from '../../util/scale';
import Quadrant, { QuadrantConfig } from './components/quadrant';
import Trendline, { TrendlineConfig } from './components/trendline';
import { getComponent } from '../../components/factory';
import * as EventParser from './event';
import './components/label/scatter-label';

interface PointStyle {
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
  point: 'scatter',
};

export interface ScatterViewConfig extends ViewConfig {
  /** 散点大小 */
  pointSize?: number;
  /** 散点样式 */
  pointStyle?: PointStyle | ((...args: any) => PointStyle);
  /** 颜色字段 */
  colorFields?: string | string[];
  /** x 轴配置 */
  xAxis?: ICatAxis | ITimeAxis | IValueAxis;
  /** y 轴配置 */
  yAxis?: IValueAxis;
  quadrant?: QuadrantConfig;
  trendline?: TrendlineConfig;
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
        grid: {
          visible: true,
        },
        line: {
          visible: true,
        },
      },
      yAxis: {
        grid: {
          visible: true,
        },
        line: {
          visible: true,
        },
      },
      tooltip: {
        visible: true,
        shared: false,
        crosshairs: {
          type: 'rect',
        },
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

  protected addGeometry() {
    const points = getGeom('point', 'circle', {
      plot: this,
    });
    this.points = points;
    if (this.options.label && this.options.label.visible) {
      this.points.label = this.extractLabel();
    }
    this.setConfig('element', points);
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
    super.parseEvents(EventParser);
  }

  protected extractLabel() {
    const props = this.options;
    const label = props.label;
    if (label && label.visible === false) {
      return false;
    }
    const labelConfig = getComponent('label', {
      plot: this,
      labelType: 'scatterLabel',
      fields: [props.yField],
      position: 'right',
      offset: 0,
      ...label,
    });
    return labelConfig;
  }
}

registerPlotType('scatter', ScatterLayer);
