import * as _ from '@antv/util';
import BasePlot from '../../base/plot';
import BaseConfig, { ElementOption, IValueAxis, ITimeAxis, ICatAxis, Label } from '../../interface/config';
import { extractScale } from '../../util/scale';
import { extractAxis } from '../../util/axis';
import * as StyleParser from '../../util/styleParser';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
// import './guide/label/bar-label';

interface AreaStyle {
  opacity?: number;
  lineDash?: number[];
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

export default class BaseBar<T extends AreaConfig = AreaConfig> extends BasePlot<T> {
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
    super._scale();
  }

  protected _coord() {}

  protected _axis() {
    const props = this._initialProps;
    const axesConfig = { fields: {} };
    const plotTheme = this.plotTheme;
    axesConfig.fields[props.xField] = {};
    axesConfig.fields[props.yField] = {};

    if (
      (props.xAxis && props.xAxis.visible === false) ||
      (plotTheme.axis.x.visible === false && (!props.xAxis || props.xAxis.visible !== true))
    ) {
      axesConfig.fields[props.xField] = false;
    } else if (props.xAxis) {
      extractAxis(axesConfig.fields[props.xField], props.xAxis);
    }

    if (
      (props.yAxis && props.yAxis.visible === false) ||
      (plotTheme.axis.y.visible === false && (!props.yAxis || props.yAxis.visible !== true))
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
    const area = getGeom('area', 'main', {
      plot: this,
    });
    this.area = area;

    if (props.label) {
      this._label();
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
      const line = getGeom('line', 'guide', {
        type: 'line',
        plot: this,
      });
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
      const point = getGeom('point', 'guide', {
        plot: this,
      });
      this._adjustPoint(point);
      this._setConfig('element', point);
      this.point = point;
    }
  }

  protected _interactions() {}

  protected _annotation() {}

  protected _animation() {}

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
      const formatter = label.formatter;
      this.area.label.callback = (val: any) => {
        return {
          formatter,
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
}
