import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';
import ViewLayer from '../../base/ViewLayer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import BaseConfig, { ElementOption, ICatAxis, ITimeAxis, IValueAxis, Label } from '../../interface/config';
import { extractAxis } from '../../util/axis';
import { extractScale } from '../../util/scale';
import * as StyleParser from '../../util/styleParser';
import responsiveMethods from './applyResponsive/index';
import * as EventParser from './event';
import './theme';

interface AreaStyle {
  opacity?: number;
  lineDash?: number[];
  strokeStyle?: string;
  lineWidth?: number;
}

interface LineStyle {
  lineDash?: number[];
  stroke?: string;
}

interface PointStyle {
  fillStyle?: string;
  strokeStyle?: string;
}

const GEOM_MAP = {
  area: 'area',
  line: 'line',
  point: 'point',
};

export interface AreaLayerConfig extends BaseConfig {
  areaStyle?: AreaStyle | ((...args: any) => AreaStyle);
  seriesField?: string;
  xAxis?: ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
  line?: {
    visible?: boolean;
    opacity?: number;
    color?: string;
    size?: number;
    style?: LineStyle;
  };
  point?: {
    visible?: boolean;
    opacity?: number;
    color?: string;
    size?: number;
    shape?: string;
    style?: PointStyle;
  };
}

export default class AreaLayer<T extends AreaLayerConfig = AreaLayerConfig> extends ViewLayer<T> {
  public line: any;
  public point: any;
  public area: any;

  protected geometryParser(dim, type) {
    return GEOM_MAP[type];
  }

  protected setType() {
    this.type = 'area';
  }

  protected beforeInit() {
    const props = this.initialProps;
    /** 响应式图形 */
    if (props.responsive && props.padding !== 'auto') {
      this._applyResponsive('preRender');
    }
  }

  protected _setDefaultG2Config() {}

  protected _scale() {
    const props = this.initialProps;
    const scales = {};
    /** 配置x-scale */
    scales[props.xField] = {
      type: 'cat',
    };
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

  protected _axis() {
    const props = this.initialProps;
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
    this.setConfig('axes', axesConfig);
  }

  protected _addGeometry() {
    const props = this.initialProps;
    const area = getGeom('area', 'main', {
      plot: this,
    });
    this.area = area;

    if (props.label) {
      this._label();
    }
    this._adjustArea(area);
    this.setConfig('element', area);

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
    const props = this.initialProps;
    let lineConfig = { visible: true, style: {} };
    if (props.line) {
      lineConfig = _.deepMix(lineConfig, props.line);
    }
    if (lineConfig.visible) {
      const line = getGeom('line', 'guide', {
        type: 'line',
        plot: this,
        line: lineConfig,
      });
      this._adjustLine(line);
      this.setConfig('element', line);
      this.line = line;
    }
  }

  protected _addPoint() {
    const props = this.initialProps;
    let pointConfig = { visible: false, style: {} };
    if (props.point) {
      pointConfig = _.deepMix(pointConfig, props.point);
    }
    if (pointConfig.visible) {
      const point = getGeom('point', 'guide', {
        plot: this,
      });
      this._adjustPoint(point);
      this.setConfig('element', point);
      this.point = point;
    }
  }

  protected _annotation() {}

  protected _animation() {}

  protected _label() {
    const props = this.initialProps;
    const label = props.label as Label;

    if (label && label.visible === false) {
      this.line.label = false;
      return;
    }
    this.area.label = getComponent('label', {
      fields: [props.yField],
      plot: this,
    });
  }

  protected _parserEvents(eventParser) {
    super._parserEvents(EventParser);
  }

  protected afterRender() {
    const props = this.initialProps;
    /** 响应式 */
    if (props.responsive && props.padding !== 'auto') {
      this._applyResponsive('afterRender');
    }
    super.afterRender();
  }

  private _applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    _.each(methods, (r) => {
      const responsive = r as DataPointType;
      responsive.method(this);
    });
  }
}
