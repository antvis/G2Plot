import * as _ from '@antv/util';
import BasePlot from '../../base/plot';
import BaseConfig, { ElementOption, IValueAxis, ITimeAxis, ICatAxis, Label } from '../../interface/config';
import { extractScale } from '../../util/scale';
import { extractAxis } from '../../util/axis';
import './guide/label/bar-label';
import IntervalParser from '../../elements/interval/main';
import LabelParser from '../../components/label';

interface BarStyle {
  opacity?: number;
  lineDash?: number[];
}

export interface BarConfig extends BaseConfig {
  // 图形
  type?: 'rect' | 'triangle' | 'round';
  // 百分比, 数值, 最小最大宽度
  barSize?: number;
  maxWidth?: number;
  minWidth?: number;
  barStyle?: BarStyle | Function;
  xAxis?: ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
}

export default class BaseBar<T extends BarConfig = BarConfig> extends BasePlot<T>{
  bar: any;
  constructor(container: string | HTMLElement, config: T) {
    super(container, config);
  }

  protected _beforeInit() {
    this.type = 'bar';
  }

  protected _setDefaultG2Config() {}

  protected _scale() {
    super._scale();
    const props = this._initialProps;
    const scales = {};
    /** 配置x-scale */
    scales[props.yField] = {
      type: 'cat',
    };
    _.has(props, 'xAxis') && extractScale(scales[props.yField], props.xAxis);
      /** 配置y-scale */
    scales[props.xField] = {};
    _.has(props, 'yAxis') && extractScale(scales[props.xField], props.yAxis);
    this._setConfig('scales', scales);
  }

  protected _coord() {
    const coordConfig = {
      actions: [
        [ 'transpose' ],
      ],
    };
    this._setConfig('coord', coordConfig);
  }

  protected _axis() {
    //todo: 这里要自定义theme
    const props = this._initialProps;
    const axesConfig = { fields:{} };
    axesConfig.fields[props.xField] = {};
    axesConfig.fields[props.yField] = {};
    this._setConfig('axes', axesConfig);
  }

  protected _adjustBar(bar: ElementOption) {
    return;
  }

  protected _addElements() {
    const props = this._initialProps;
    const bar = new IntervalParser({
      positionFields: [props.yField, props.xField],
      plot:this
    }).element;
    if (props.label) {
      bar.label = this._extractLabel();
    }
    this._adjustBar(bar);
    this.bar = bar;
    this._setConfig('element', bar);
  }

  protected _interactions() {
  }

  protected _annotation() {}

  protected _animation() {
    const props = this._initialProps;
    if (props.animation === false) {
      /**关闭动画 */
      this.bar.animate = false;
    }
  }

  protected _extractLabel() {
    const props = this._initialProps;
    const label = props.label as Label;

    if (label && label.visible === false) return false;

    const labelConfig = new LabelParser({
      plot:this,
      labelType: 'barLabel',
      fields: [ props.xField ],
      ...label
    }).config;
  
    return labelConfig as any;
  }

}
