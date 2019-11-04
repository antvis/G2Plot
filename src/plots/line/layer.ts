import * as _ from '@antv/util';
import ViewLayer from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import BaseConfig, { ICatAxis, ITimeAxis, IValueAxis, Label } from '../../interface/config';
import { extractScale } from '../../util/scale';
import './animation/clipIn-with-data';
import responsiveMethods from './apply-responsive';
import './apply-responsive/theme';
import './apply-responsive/theme';
import './component/label/line-label';
import './component/label/point-label';
import * as EventParser from './event';
import { LineActive, LineSelect } from './interaction/index';
import './theme';

export interface LineStyle {
  opacity?: number;
  lineDash?: number[];
}

interface PointStyle {
  shape?: string;
  size?: number;
  color?: string;
  opacity?: string;
}

interface IObject {
  [key: string]: any;
}

const GEOM_MAP = {
  line: 'line',
  point: 'point',
};

export interface LineLayerConfig extends BaseConfig {
  /** 分组字段 */
  seriesField?: string;
  /** 是否平滑 */
  smooth?: boolean;
  /** 是否连接空数据 */
  connectNulls?: boolean;
  /** 折线extra图形样式 */
  lineStyle?: LineStyle | ((...args: any[]) => LineStyle);
  /** 折线数据点图形样式 */
  point?: {
    visible?: boolean;
    style?: PointStyle;
  };
  xAxis?: IValueAxis | ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
}

export default class LineLayer<T extends LineLayerConfig = LineLayerConfig> extends ViewLayer<T> {
  public static getDefaultProps() {
    const globalDefaultProps = super.getDefaultProps();
    return _.deepMix({}, globalDefaultProps, {
      connectNulls: false,
      smooth: false,
      lineSize: 2,
      point: {
        visible: false,
        size: 4,
        shape: 'point',
      },
      label: {
        visible: false,
        type: 'point',
      },
    });
  }
  public line: any; // 保存line和point的配置项，用于后续的label、tooltip
  public point: any;

  protected setType() {
    this.type = 'line';
  }

  protected geometryParser(dim, type) {
    return GEOM_MAP[type];
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

  protected _addGeometry() {
    const props = this.initialProps;
    this.line = getGeom('line', 'main', {
      plot: this,
    });
    if (props.label) {
      this._label();
    }
    this.setConfig('element', this.line);
    // 配置数据点
    this._addPoint();
  }

  protected _addPoint() {
    const props = this.initialProps;
    const defaultConfig = { visible: false };
    if (props.point) {
      props.point = _.deepMix(defaultConfig, props.point);
    }
    if (props.point && props.point.visible) {
      const point = getGeom('point', 'guide', {
        plot: this,
      });
      this.setConfig('element', point);
      this.point = point;
    }
  }

  protected _label() {
    const props = this.initialProps;
    const label = props.label as Label;

    if (label.visible === false) {
      this.line.label = false;
      return;
    }
    /** label类型为line，即跟随在折线尾部时，设置offset为0 */
    if (label.type === 'line') {
      label.offset = 0;
    }

    this.line.label = getComponent('label', {
      fields: label.type === 'line' ? [props.seriesField] : [props.yField],
      labelType: label.type,
      plot: this,
    });
  }

  protected _annotation() {}

  protected _animation() {
    const props = this.initialProps;
    if (props.animation === false) {
      // 关闭动画
      this.line.animate = false;
    } else if (_.has(props, 'animation')) {
      // 根据动画类型区分图形动画和群组动画
      if (props.animation.type === 'clipingWithData') {
        this.line.animate = {
          appear: {
            animation: 'clipingWithData',
            easing: 'easeLinear',
            duration: 10000,
            yField: props.yField,
          },
        };
        // 如果有数据点的话要追加数据点的动画
        if (props.point && props.point.visible) {
          this.point.animate = {
            appear: {
              animation: 'zoomIn',
              delay: 10000,
            },
          };
        }
      }
    }
  }

  protected _interactions() {
    super._interactions();
    const props = this.initialProps;
    // 加入默认交互
    const interactions = this.plot.get('interactions');
    const lineActive = new LineActive({ view: this.plot });
    interactions.lineActive = lineActive;
    const lineSelect = new LineSelect({ view: this.plot });
    interactions.lineSelect = lineSelect;
  }

  protected _parserEvents(eventParser) {
    super._parserEvents(EventParser);
  }

  protected afterRender() {
    const props = this.initialProps;
    // 响应式
    if (props.responsive && props.padding !== 'auto') {
      this._applyResponsive('afterRender');
    }
    super.afterRender();
  }

  private _applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    _.each(methods, (r) => {
      const responsive = r as IObject;
      responsive.method(this);
    });
  }
}
