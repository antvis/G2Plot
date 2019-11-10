import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { ICatAxis, ITimeAxis, IValueAxis, Label } from '../../interface/config';
import { extractScale } from '../../util/scale';
import './component/label/bubble-label';
import * as EventParser from './event';

interface BubbleStyle {
  opacity?: number;
  lineDash?: number[];
}

const G2_GEOM_MAP = {
  bubble: 'point',
};

const PLOT_GEOM_MAP = {
  point: 'bubble',
};

export interface BubbleViewConfig extends ViewConfig {
  /** TODO 待补充 */
  bubbleStyle?: BubbleStyle | ((...args: any[]) => BubbleStyle);
  /** 气泡大小字段 */
  sizeField?: string;
  /** 气泡颜色字段 */
  colorField?: string;
  xAxis?: ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
}

export interface BubbleLayerConfig extends BubbleViewConfig, LayerConfig {}

export default class BaseBubbleLayer<T extends BubbleLayerConfig = BubbleLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      tooltip: {
        visible: true,
        shared: false,
        crosshairs: {
          type: 'rect',
        },
      },
      point: {
        shape: 'circle',
        size: [8, 58],
        style: {
          lineWidth: 1,
          strokeOpacity: 1,
          fillOpacity: 0.4,
          opacity: 0.65,
        },
      },
      label: {
        visible: false,
        position: 'top',
      },
    });
  }

  public type: string = 'bubble';

  public bubbles: any;

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

    if (props.label) {
      bubbles.label = this.extractLabel();
    }

    /** 取消颜色的图例 */
    /* this.setConfig('legends', {
      fields: {
        [props.sizeField]: false,
      },
    });*/

    this.bubbles = bubbles;
    this.setConfig('element', bubbles);
  }

  protected annotation() {}

  protected animation() {
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.bubbles.animate = false;
    }
  }

  protected parserEvents(eventParser) {
    super.parserEvents(EventParser);
  }

  protected extractLabel() {
    const props = this.options;
    const label = props.label as Label;
    if (label && label.visible === false) {
      return false;
    }
    const labelConfig = getComponent('label', {
      plot: this,
      labelType: 'bubbleLabel',
      fields: [props.yField],
      ...label,
    });
    return labelConfig;
  }
}

registerPlotType('bubble', BaseBubbleLayer);
