import BasePlot from '../../base/plot';
import BaseConfig, {
  ElementOption,
  IValueAxis,
  ITimeAxis,
  ICatAxis,
  Label,
  IColorConfig } from '../../interface/config';
import _ from 'lodash';
import { LineActive, LineSelect, Range } from './interaction/index';
import { extractScale } from '../../util/scale';
import { extractAxis } from '../../util/axis';
import './guide/label/point-label';
import './guide/label/line-label';
import TimeGroupAnnotation from './guide/annotation/timeGroupAnnotation';
import './animation/clipInWithData';
import * as StyleParser from '../../util/styleParser';
import * as EventParser from './event';

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

export interface LineConfig extends BaseConfig {
  /** 分组字段 */
  seriesField?: string;
  /** 是否平滑 */
  smooth?: boolean;
  /** 是否连接空数据 */
  connectNull?: boolean;
  /** 折线extra图形样式 */
  lineStyle?: LineStyle | Function;
  /** 折线数据点图形样式 */
  pointStyle?: PointStyle;
  xAxis: IValueAxis | ICatAxis | ITimeAxis;
  yAxis: IValueAxis;
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

  constructor(container, config: LineConfig) {
    super(container, config);
    /**plot实例创建后的特殊逻辑 */
    this._afterInit();
  }

  protected _setDefaultG2Config() {}

  protected _scale() {
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

  protected _coord() {}

  protected _axis() {
    const props = this._initialProps;
    const axesConfig = { fields:{} };
    axesConfig.fields[props.xField] = {};
    axesConfig.fields[props.yField] = {};
    /** 配置x轴 */
    extractAxis(axesConfig.fields[props.xField], props.xField, props.xAxis, this._config.theme);
    /** 配置y轴 */
    extractAxis(axesConfig.fields[props.yField], props.yField, props.yAxis, this._config.theme);
    /** 存储坐标轴配置项到config */
    this._setConfig('axes', axesConfig);
  }

  protected _addElements() {
    const props = this._initialProps;
    // 配置线
    const line: ElementOption = {
      type: 'line',
      position: {
        fields: [ props.xField, props.yField ],
      },
    };
    if (props.seriesField || props.color) line.color = this._lineColor();
    if (props.size) line.size = { values: [ props.size ] };
    if (props.smooth) line.shape = { values: [ 'smooth' ] };
    if (props.lineStyle) line.style = this._lineStyle();
    this.line = line;
    if (props.label) {
      this._label();
    }
    this._setConfig('element', line);
    // 配置数据点
    if (props.pointStyle) {
      this._addPoint();
    }
  }

  protected _addPoint() {
    const props = this._initialProps;
    const pointCfg = props.pointStyle;
    const point = {
      type: 'point',
      position: {
        fields: [ props.xField, props.yField ],
      },
      color: this._pointColor(),
      shape: { values: [ 'circle' ] },
      size: { values: [ 2 ] },
    };
    if (pointCfg.shape)  point.shape.values[0] = pointCfg.shape;
    if (pointCfg.size) point.size.values[0] = pointCfg.size;
    this._setConfig('element', point);
    this.point = point;
  }

  protected _label() {
    const props = this._initialProps;
    const label = props.label as Label;
    const labelType = label.type;
    this.line.label = {
      fields: labelType === 'point' ? [ props.yField ] : [ props.seriesField ],
      type: labelType,
    };
    /** formater */
    if (_.isFunction(label) && label.formatter) {
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

  protected _annotation() {}

  protected _animation() {
    const props = this._initialProps;
    if (props.animation === false) {
      /**关闭动画 */
      this.line.animate = false;
    }else if (_.has(props, 'animation')) {
      /**根据动画类型区分图形动画和群组动画 */
      if (props.animation.type === 'clipingWithData') {
        this.line.animate = {
          appear:{
            animation: 'clipingWithData',
            easing: 'easeLinear',
            duration: 10000,
            yField: props.yField,
          },
        };
        /**如果有数据点的话要追加数据点的动画 */
        if (props.pointStyle) {
          this.point.animate = {
            appear:{
              animation: 'zoomIn',
              delay:10000,
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
      if (i.type === 'range')  this._addRangeInteraction(interactions, props);
    });
  }

  protected _events(eventParser) {
    super._events(EventParser);
  }

  protected _afterInit() {
    super._afterInit();
    const props = this._initialProps;
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

  private _lineColor() {
    const props = this._initialProps;
    const config:IColorConfig = {};
    if (_.has(props, 'seriesField')) {
      config.fields = [ props.seriesField ];
    }
    if (_.has(props, 'color')) {
      const color = props.color;
      if (_.isString(color)) {
        config.values = [ color ];
      }else {
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
    const pointStyleProps = props.pointStyle;
    const config = {
      fields: null,
      values: null,
    };
    /**多折线的数据点*/
    if (props.seriesField) {
      config.fields = [ props.seriesField ];
      if (pointStyleProps.color) {
        const count = getValuesByField(props.seriesField, props.data).length;
        const values = [];
        for (let i = 0; i < count; i++) {
          values.push(pointStyleProps.color);
        }
        config.values = values;
        return config;
      }
      /**多折线，用户没有指定数据点颜色，则采用与折线相同的颜色 */
      config.values =  props.color;
      return config;
    }
    /**单折线的数据点 */
    if (pointStyleProps.color) {
      config.values = [ pointStyleProps.color ];
    }else {
      config.values = [ props.color ];
    }
    return config;
  }
}
