import * as _ from '@antv/util';
import BasePlot from '../../base/plot';
import BaseConfig, { ElementOption, IValueAxis, ITimeAxis, ICatAxis, Label } from '../../interface/config';
import { extractScale } from '../../util/scale';
import { extractAxis } from '../../util/axis';
import * as StyleParser from '../../util/styleParser';
import GuideLineParser from '../../elements/line/guide';
// import './guide/label/bar-label';

interface AreaStyle {
  opacity?: number;
  lineDash?: number[];
}

interface ILabelCallbackOptions {
  content?: Function;
  offset?: number;
  offsetX?: number;
  offsetY?: number;
  textStyle?: {};
  position?: string;
}

interface LineStyle {
  opacity?: number;
  lineDash?: number[];
  color?: string;
  size?: number;
}

interface PointStyle {
  shape?: string;
  size?: number;
  color?: string;
  opacity?: string;
}

export interface AreaConfig extends BaseConfig {
  areaStyle?: AreaStyle | Function;
  xAxis?: ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
  line?: {
    visible?: boolean;
    style?: LineStyle;
  };
  point?: {
    visible?: boolean;
    style?: PointStyle;
  };
}

export default class BaseBar<T extends AreaConfig = AreaConfig> extends BasePlot<T>{
  line: any;
  point: any;
  area: any;

  constructor(container: string | HTMLElement, config: T) {
    super(container, config);
  }

  protected _beforeInit() {
    this.type = 'area';
  }

  protected _setDefaultG2Config() {}

  protected _scale() {
    super._scale();
    const props = this._initialProps;
    const scales = {};
    /** 配置x-scale */
    scales[props.xField] = {
      type: 'cat',
    };
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
    const area: ElementOption = {
      type: 'area',
      position: {
        fields: [ props.xField, props.yField ],
      },
    };
    this.area = area;
    if (props.area) area.style = this._areaStyle();
    if (props.label) {
      this._label();
    }
    if (props.color) {
      if (_.isString(props.color)) {
        area.color = {
          values: [ props.color ],
        };
      } else if (_.isFunction(props.color)) {
        area.color = {
          fields: [ props.xField, props.yField ],
          callback: props.color,
        };
      } else if (_.isArray(props.color)) {
        area.color = {
          fields: [ props.xField ],
          values: props.color,
        };
      }
    }
    this._adjustArea(area);
    this._setConfig('element', area);

    this._addLine();
    

    this._addPoint();
  }

  protected _adjustArea(area: ElementOption) {
    return;
  }

  protected _adjustLine(line: ElementOption) {
    return;
  }

  protected _adjustPoint(point: ElementOption) {
    return;
  }

  protected _addLine() {
    const props = this._initialProps;
    let lineConfig = { visible: false, style: {} };
    if (props.line) lineConfig = _.deepMix(lineConfig, props.line);
    if (lineConfig.visible) {
      /*const line = {
        type: 'line',
        position: {
          fields: [ props.xField, props.yField ],
        },
        color: this._lineColor(),
        size: { values: [ 2 ] },
        // cfg: lineConfig.style
      };
      const pointStyle = lineConfig.style as PointStyle;
      if (_.hasKey(pointStyle, 'size')) line.size.values[0] = pointStyle.size;*/
      const line = new GuideLineParser({
        type:'line',
        plot: this
      }).element;
      this._adjustLine(line);
      this._setConfig('element', line);
      this.line = line;
    }
  }

  protected _addPoint() {
    const props = this._initialProps;
    let pointConfig = { visible: false, style: {} };
    if (props.point) pointConfig = _.deepMix(pointConfig, props.point);
    if (pointConfig.visible) {
      const point = {
        type: 'point',
        position: {
          fields: [ props.xField, props.yField ],
        },
        color: this._pointColor(),
        shape: { values: [ 'point' ] },
        size: { values: [ 3 ] },
        // cfg: {}
      };
      const pointStyle = pointConfig.style as PointStyle;
      if (_.hasKey(pointStyle, 'shape')) point.shape.values[0] = pointStyle.shape;
      if (_.hasKey(pointStyle, 'size')) point.size.values[0] = pointStyle.size;
      this._adjustPoint(point);
      this._setConfig('element', point);
      this.point = point;
    }
  }

  protected _interactions() {
  }

  protected _annotation() {}

  protected _animation() {
  }

  private _areaStyle() {
    const props = this._initialProps;
    const areaStyleProps = props.areaStyle;
    const config = {
      fields: null,
      callback: null,
      cfg: null,
    };
    config.cfg = areaStyleProps;
    return config;
  }

  protected _label() {
    const props = this._initialProps;
    const label = props.label as Label;
    const labelType = label.type;
    if (label && label.visible === false) {
      this.area.label = false;
      return;
    }
    this.area.label = {
      fields: [ props.yField ],
      type: labelType || 'line',
    };
    /** formater */
    if (label.formatter) {
      const formater = label.formatter;
      this.area.label.callback = (val) => {
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

  private _lineColor() {
    const props = this._initialProps;
    const lineStyleProps = props.line.style;
    const config = {
      fields: [],
      values: [] as any,
    };
    if (lineStyleProps && lineStyleProps.color) {
      config.values = [ lineStyleProps.color ];
    } else if (props.color) {
      config.values = [ props.color ];
    }
    return config;
}

  private _pointColor() {
    const props = this._initialProps;
    const pointStyleProps = _.get(props, [ 'point', 'style' ]);
    const config = {
      fields: [],
      values: [] as any,
    };
    /**单折线的数据点 */
    if (pointStyleProps && pointStyleProps.color) {
      config.values = [ pointStyleProps.color ];
    } else if (props.color) {
      config.values = [ props.color ];
    }
    return config;
  }
}
