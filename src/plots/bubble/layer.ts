import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';
import ViewLayer from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import BaseConfig, { ElementOption, ICatAxis, ITimeAxis, IValueAxis, Label } from '../../interface/config';
import { extractScale } from '../../util/scale';
import './component/label/bubble-label';
import * as EventParser from './event';
import './theme';

interface BubbleStyle {
  opacity?: number;
  lineDash?: number[];
}

const G2_GEOM_MAP = {
  bubble: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'bubble',
};

export interface BubbleLayerConfig extends BaseConfig {
  /** TODO 待补充 */
  bubbleStyle?: BubbleStyle | ((...args: any[]) => BubbleStyle);
  xAxis?: ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
}

export default class BaseBubbleLayer<T extends BubbleLayerConfig = BubbleLayerConfig> extends ViewLayer<T> {
  public bubbles: any;

  public getDefaultProps() {
    const globalDefaultProps = super.getDefaultProps();
    return _.deepMix({}, globalDefaultProps, {
      tooltip: {
        visible: true,
        shared: false,
        crosshairs: {
          type: 'rect',
        },
      },
      point: {
        shape: 'cicle',
        size: 8,
      },
      label: {
        visible: false,
        position: 'top',
      },
    });
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected setType() {
    this.type = 'bubble';
  }

  protected beforeInit() {
    super.beforeInit();
    const props = this.initialProps;
    /** 响应式图形 */
    if (props.responsive && props.padding !== 'auto') {
      // this._applyResponsive('preRender');
    }
  }

  protected _setDefaultG2Config() {}

  protected _scale() {
    const props = this.initialProps;
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
    super._scale();
  }

  protected _coord() {}

  protected _adjustColumn(column: ElementOption) {
    return;
  }

  protected _addGeometry() {
    const props = this.initialProps;

    const bubbles = getGeom('point', 'circle', {
      positionFields: [props.xField, props.yField],
      plot: this,
    });

    if (props.label) {
      // column.label = this._extractLabel();
    }
    this._adjustColumn(bubbles);
    this.bubbles = bubbles;
    console.log(bubbles, '=====');
    this.setConfig('element', bubbles);
  }

  protected _annotation() {}

  protected _animation() {
    const props = this.initialProps;
    if (props.animation === false) {
      /** 关闭动画 */
      this.bubbles.animate = false;
    }
  }

  protected _parserEvents(eventParser) {
    super._parserEvents(EventParser);
  }

  protected afterRender() {
    const props = this.initialProps;
    /** 响应式 */
    if (props.responsive && props.padding !== 'auto') {
      // this._applyResponsive('afterRender');
    }
    super.afterRender();
  }

  protected _extractLabel() {
    const props = this.initialProps;
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
