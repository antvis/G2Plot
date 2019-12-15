import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { ICatAxis, ITimeAxis, IValueAxis, Label } from '../../interface/config';
import { extractScale } from '../../util/scale';
import '../scatter/components/label/scatter-label';
import * as EventParser from '../scatter/event';
import Quadrant, { QuadrantConfig } from '../scatter/components/quadrant';
import Trendline, { TrendlineConfig } from '../scatter/components/trendline';

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
  point: 'point',
};

const PLOT_GEOM_MAP = {
  point: 'point',
};

export interface BubbleViewConfig extends ViewConfig {
  /** 气泡大小 */
  pointSize?: [number, number];
  /** 气泡样式 */
  pointStyle?: PointStyle | ((...args: any) => PointStyle);
  /** 气泡大小字段 */
  sizeField?: string;
  /** 气泡颜色字段 */
  colorFields?: string | string[];
  /** x 轴配置 */
  xAxis?: ICatAxis | ITimeAxis | IValueAxis;
  /** y 轴配置 */
  yAxis?: IValueAxis;
  quadrant?: QuadrantConfig;
  trendline?: TrendlineConfig;
}

export interface BubbleLayerConfig extends BubbleViewConfig, LayerConfig {}

export default class BubbleLayer<T extends BubbleLayerConfig = BubbleLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      pointSize: [8, 58],
      pointStyle: {
        opacity: 0.5,
      },
      xAxis: {
        grid: {
          visible: true,
        },
      },
      yAxis: {
        grid: {
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
        position: 'middle',
      },
      shape: 'circle',
    });
  }

  public type: string = 'bubble';

  public bubbles: any;
  protected quadrant: Quadrant;
  protected trendline: Trendline;

  public afterRender() {
    super.afterRender();
    if (this.options.quadrant) {
      if (this.quadrant) this.quadrant.destroy();
      this.quadrant = new Quadrant({
        view: this.view,
        plotOptions: this.options,
        ...this.options.quadrant,
      });
      this.quadrant.render();
    }
    if (this.options.trendline) {
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
    const props = this.options;

    const bubbles = getGeom('point', 'circle', {
      plot: this,
    });

    if (props.label && props.label.visible) {
      bubbles.label = this.extractLabel();
    }

    /** 取消气泡大小图例 */
    this.setConfig('legends', {
      fields: {
        [props.sizeField]: false,
      },
    });

    this.bubbles = bubbles;
    this.setConfig('element', bubbles);
  }

  protected animation() {
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.bubbles.animate = false;
    }
  }

  protected parseEvents(eventParser) {
    super.parseEvents(EventParser);
  }

  protected extractLabel() {
    const props = this.options;
    const label = props.label as Label;
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

registerPlotType('bubble', BubbleLayer);
