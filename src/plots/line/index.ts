import * as _ from '@antv/util';
import BasePlot from '../../base/plot';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import BaseConfig, { ICatAxis, ITimeAxis, IValueAxis, Label } from '../../interface/config';
import { extractScale } from '../../util/scale';
import './animation/clipInWithData';
import responsiveMethods from './applyResponsive/index';
import './applyResponsive/theme';
import './applyResponsive/theme';
import TimeGroupAnnotation from './component/annotation/timeGroupAnnotation';
import './component/label/line-label';
import './component/label/point-label';
import * as EventParser from './event';
import { LineActive, LineSelect, Range } from './interaction/index';
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

export interface LineConfig extends BaseConfig {
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

export default class Line extends BasePlot<LineConfig> {
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
    const props = this._initialProps;
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
    this._setConfig('scales', scales);
    super._scale();
  }

  protected _coord() {}

  protected _addGeometry() {
    const props = this._initialProps;
    this.line = getGeom('line', 'main', {
      plot: this,
    });
    if (props.label) {
      this._label();
    }
    this._setConfig('element', this.line);
    // 配置数据点
    this._addPoint();
  }

  protected _addPoint() {
    const props = this._initialProps;
    const defaultConfig = { visible: false };
    if (props.point) {
      props.point = _.deepMix(defaultConfig, props.point);
    }
    if (props.point && props.point.visible) {
      const point = getGeom('point', 'guide', {
        plot: this,
      });
      this._setConfig('element', point);
      this.point = point;
    }
  }

  protected _label() {
    const props = this._initialProps;
    const label = props.label as Label;

    if (label && label.visible === false) {
      this.line.label = false;
      return;
    }
    const labelType = label.type ? label.type : 'point';
    /** label类型为line，即跟随在折线尾部时，设置offset为0 */
    if (labelType === 'line') {
      label.offset = 0;
    }

    this.line.label = getComponent('label', {
      fields: labelType === 'line' ? [props.seriesField] : [props.yField],
      labelType,
      plot: this,
    });
  }

  protected _annotation() {}

  protected _animation() {
    const props = this._initialProps;
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
    const props = this._initialProps;
    // 加入默认交互
    const interactions = this.plot.get('interactions');
    const lineActive = new LineActive({ view: this.plot });
    interactions.lineActive = lineActive;
    const lineSelect = new LineSelect({ view: this.plot });
    interactions.lineSelect = lineSelect;
    /** 加入其它交互 */
    const interactionProps = props.interactions;
    _.each(interactionProps, (i) => {
      if (i.type === 'range') {
        this._addRangeInteraction(interactions, props);
      }
    });
  }

  protected _events(eventParser) {
    super._events(EventParser);
  }

  protected _afterInit() {
    super._afterInit();
    const props = this._initialProps;
    // 时间子母轴
    if (props.xAxis && props.xAxis.hasOwnProperty('groupBy')) {
      const xAxis = props.xAxis as ITimeAxis;
      const timeGroup = new TimeGroupAnnotation({
        view: this.plot,
        field: props.xField,
        groupDim: xAxis.groupBy,
      });
    }
  }

  protected _afterRender(){
    super._afterRender();
    const props = this._initialProps;
     // 响应式
     if (props.responsive && props.padding !== 'auto') {
        this._applyResponsive('afterRender');
      }
  }

  private _addRangeInteraction(interactions, props) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const padding = props.padding;
    this.plot.once('afterrender', () => {
      const range = new Range({ view: this.plot, container, padding });
      interactions.range = range;
    });
  }

  private _applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    _.each(methods, (r) => {
      const responsive = r as IObject;
      responsive.method(this);
    });
    const canvas = this.canvasController.canvas;
    canvas.draw();
  }

}
