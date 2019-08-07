import BasePlot from '../../base/plot';
import BaseConfig, {
  ElementOption,
  IValueAxis,
  ITimeAxis,
  ICatAxis,
  Label,
  IColorConfig,
} from '../../interface/config';
import * as _ from '@antv/util';
import { LineActive, LineSelect, Range } from './interaction/index';
import { extractScale } from '../../util/scale';
import { extractAxis } from '../../util/axis';
import './guide/label/point-label';
import './guide/label/line-label';
import TimeGroupAnnotation from './guide/annotation/timeGroupAnnotation';
import './animation/clipInWithData';
import * as StyleParser from '../../util/styleParser';
import * as EventParser from './event';
import responsiveMethods from './applyResponsive/index';
import LineElement from '../../elements/line';
import GuidePointParser from '../../elements/point/guide';

interface LineStyle {
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
  [key:string]: any;
}

export interface LineConfig extends BaseConfig {
  /** 分组字段 */
  seriesField?: string;
  /** 是否平滑 */
  smooth?: boolean;
  /** 是否连接空数据 */
  connectNulls?: boolean;
  /** 折线extra图形样式 */
  lineStyle?: LineStyle | Function;
  /** 折线数据点图形样式 */
  point?: {
    visible?: boolean,
    style?: PointStyle;
  };
  xAxis?: IValueAxis | ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
}

function getValuesByField(field, data) {
  const values = [];
  _.each(data, (d) => {
    const v = d[field];
    values.push(v);
  });
  return _.uniq(values);
}

export default class Line extends BasePlot<LineConfig>{
  line: any; // 保存line和point的配置项，用于后续的label、tooltip和
  point: any;

  protected _beforeInit() {
    this.type = 'line';
  }

  protected _setDefaultG2Config() { }

  protected _scale() {
    super._scale();
    const props = this._initialProps;
    const scales = {};
    /** 配置x-scale */
    scales[props.xField] = {};
    _.has(props, 'xAxis') && extractScale(scales[props.xField], props.xAxis);
    /** 配置y-scale */
    scales[props.yField] = {};
    _.has(props, 'yAxis') && extractScale(scales[props.yField], props.yAxis);

    this._setConfig('scales', scales);
  }

  protected _coord() { }

  protected _axis() {
    const props = this._initialProps;
    const axesConfig = { fields:{} };
    const plotTheme = this.plotTheme;
    axesConfig.fields[props.xField] = {};
    axesConfig.fields[props.yField] = {};

    if ((props.xAxis && (props.xAxis.visible === false)
        || (plotTheme.axis.x.visible === false &&  (!props.xAxis || props.xAxis.visible !== true)))
    ) {
      axesConfig.fields[props.xField] = false;
    } else if (props.xAxis) {
      extractAxis(axesConfig.fields[props.xField], props.xAxis);
    }

    if ((props.yAxis && (props.yAxis.visible === false)
        || (plotTheme.axis.y.visible === false &&  (!props.yAxis || props.yAxis.visible !== true)))
    ) {
      axesConfig.fields[props.yField] = false;
    } else if (props.yAxis) {
      extractAxis(axesConfig.fields[props.yField], props.yAxis);
    }
    /** 存储坐标轴配置项到config */
    this._setConfig('axes', axesConfig);
  }

  protected _addElements() {
   const props = this._initialProps;
    const LineParser = LineElement.main;
    this.line = new LineParser({
      plot: this
    }).element;
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
    if (props.point) props.point = _.deepMix(defaultConfig, props.point);
    if (props.point.visible) {
     /* const point = {
        type: 'point',
        position: {
          fields: [ props.xField, props.yField ],
        },
        color: this._pointColor(),
        shape: { values: [ 'point' ] },
        size: { values: [ 3 ] },
      };
      const pointStyle = pointConfig.style as PointStyle;
      if (_.hasKey(pointStyle, 'shape')) point.shape.values[0] = pointStyle.shape;
      if (_.hasKey(pointStyle, 'size')) point.size.values[0] = pointStyle.size;*/
      const point:ElementOption = new GuidePointParser({
        plot: this
      }).element;
      this._setConfig('element', point);
      this.point = point;
    }
  }

  protected _label() {
    const props = this._initialProps;
    const label = props.label as Label;
    const labelType = label.type ? label.type :'point';
    if (label && label.visible === false) {
      this.line.label = false;
      return;
    }
    this.line.label = {
      fields: labelType === 'line' ? [ props.seriesField ] : [ props.yField ],
      labelType,
    };
    /** formater */
    if (label.formatter) {
      const formater = label.formatter;
      this.line.label.callback = (val) => {
        return {
          content: formater(val),
          offsetX: label.offsetX ? label.offsetX : 0,
          offsetY: label.offsetY ? label.offsetY : 0,
        };
      };
    }
    /** label样式 */
    if (label.style) {
      const theme = this._config.theme;
      StyleParser.LabelStyleParser(theme, label.style);
    }
  }

  protected _annotation() { }

  protected _animation() {
    const props = this._initialProps;
    if (props.animation === false) {
      /**关闭动画 */
      this.line.animate = false;
    } else if (_.has(props, 'animation')) {
      /**根据动画类型区分图形动画和群组动画 */
      if (props.animation.type === 'clipingWithData') {
        this.line.animate = {
          appear: {
            animation: 'clipingWithData',
            easing: 'easeLinear',
            duration: 10000,
            yField: props.yField,
          },
        };
        /**如果有数据点的话要追加数据点的动画 */
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
    /** 加入默认交互 */
    const interactions = this.plot.get('interactions');
    const lineActive = new LineActive({ view: this.plot });
    interactions.lineActive = lineActive;
    const lineSelect = new LineSelect({ view: this.plot });
    interactions.lineSelect = lineSelect;
    /** 加入其它交互 */
    const interactionProps = props.interactions;
    _.each(interactionProps, (i) => {
      if (i.type === 'range') this._addRangeInteraction(interactions, props);
    });
  }

  protected _events(eventParser) {
    super._events(EventParser);
  }

  protected _afterInit() {
    super._afterInit();
    const props = this._initialProps;
    /**响应式 */
    if (props.responsive && props.padding !== 'auto') {
      this.plot.once('afterrender', () => {
        this._applyResponsive('afterRender');
      });
    }
    /**时间子母轴 */
    if (props.xAxis && props.xAxis.hasOwnProperty('groupBy')) {
      const xAxis = props.xAxis as ITimeAxis;
      const timeGroup = new TimeGroupAnnotation({
        view: this.plot,
        field: props.xField,
        groupDim: xAxis.groupBy,
      });
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

  /*private _lineColor() {
    const props = this._initialProps;
    const config: IColorConfig = {};
    if (_.has(props, 'seriesField')) {
      config.fields = [ props.seriesField ];
    }
    if (_.has(props, 'color')) {
      const color = props.color;
      if (_.isString(color)) {
        config.values = [ color ];
      } else {
        config.values = color as [];
      }
    }
    return config;
  }

  private _lineStyle() {
    const props = this._initialProps;
    const lineStyleProps = props.lineStyle;
    const config = {
      fields: null,
      callback: null,
      cfg: null,
    };
    if (_.isFunction(lineStyleProps) && props.seriesField) {
      config.fields = [ props.seriesField ];
      config.callback = lineStyleProps;
      return config;
    }
    config.cfg = lineStyleProps;
    return config;
  }

  private _pointColor() {
    const props = this._initialProps;
    const pointStyleProps = props.point.style;
    const config = {
      fields: [],
      values: [] as any,
    };
    if (props.seriesField) {
      config.fields = [ props.seriesField ];
      if (pointStyleProps && pointStyleProps.color) {
        const count = getValuesByField(props.seriesField, props.data).length;
        const values = [];
        for (let i = 0; i < count; i++) {
          values.push(pointStyleProps.color);
        }
        config.values = values;
        return config;
      }
      config.values = props.color;
      return config;
    }
    if (pointStyleProps && pointStyleProps.color) {
      config.values = [ pointStyleProps.color ];
    } else if (props.color) {
      config.values = [ props.color ];
    }
    return config;
}*/

  private _applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    _.each(methods, (r) => {
      const responsive = r as IObject;
      responsive.method(this);
    });
  }

}
