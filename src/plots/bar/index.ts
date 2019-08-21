import * as _ from '@antv/util';
import BasePlot from '../../base/plot';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import BaseConfig, { ElementOption, ICatAxis, ITimeAxis, IValueAxis, Label } from '../../interface/config';
import { extractAxis } from '../../util/axis';
import { extractScale } from '../../util/scale';
import * as StyleParser from '../../util/styleParser';
import './guide/label/bar-label';

interface BarStyle {
  opacity?: number;
  lineDash?: number[];
}

interface ILabelCallbackOptions {
  content?: (...args: any[]) => any;
  offset?: number;
  offsetX?: number;
  offsetY?: number;
  textStyle?: {};
  position?: string;
}

export interface BarConfig extends BaseConfig {
  // 图形
  type?: 'rect' | 'triangle' | 'round';
  // 百分比, 数值, 最小最大宽度
  barSize?: number;
  maxWidth?: number;
  minWidth?: number;
  barStyle?: BarStyle | ((...args: any[]) => BarStyle);
  xAxis?: ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
}

export default class BaseBar<T extends BarConfig = BarConfig> extends BasePlot<T> {
  public bar: any;
  constructor(container: string | HTMLElement, config: T) {
    super(container, config);
  }

  protected _beforeInit() {
    this.type = 'bar';
  }

  protected _setDefaultG2Config() {}

  protected _scale() {
    const props = this._initialProps;
    const scales = {};
    /** 配置x-scale */
    scales[props.yField] = {
      type: 'cat',
    };
    if (_.has(props, 'xAxis')) {
      extractScale(scales[props.yField], props.xAxis);
    }
    /** 配置y-scale */
    scales[props.xField] = {};
    if (_.has(props, 'yAxis')) {
      extractScale(scales[props.xField], props.yAxis);
    }
    this._setConfig('scales', scales);
    super._scale();
  }

  protected _coord() {
    const coordConfig = {
      actions: [['transpose']],
    };
    this._setConfig('coord', coordConfig);
  }

  // TODO： 条形图的坐标轴样式需要在theme里注册一下
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

  protected _adjustBar(bar: ElementOption) {
    return;
  }

  protected _addElements() {
    const props = this._initialProps;
    const bar = getGeom('interval', 'main', {
      positionFields: [props.yField, props.xField],
      plot: this,
    });
    if (props.label) {
      bar.label = this._extractLabel();
    }
    this._adjustBar(bar);
    this.bar = bar;
    this._setConfig('element', bar);
  }

  protected _interactions() {}

  protected _annotation() {}

  protected _animation() {
    const props = this._initialProps;
    if (props.animation === false) {
      /** 关闭动画 */
      this.bar.animate = false;
    }
  }

  protected _extractLabel() {
    const props = this._initialProps;
    const label = props.label as Label;

    if (label && label.visible === false) {
      return false;
    }
    const labelConfig = getComponent('label', {
      plot: this,
      labelType: 'barLabel',
      fields: [props.xField],
      ...label,
    });

    return labelConfig;
  }
}
