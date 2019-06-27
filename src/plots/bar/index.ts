import * as _ from '@antv/util';
import BasePlot from '../../base/plot';
import BaseConfig, { ElementOption, IValueAxis, ITimeAxis, ICatAxis, Label } from '../../interface/config';
import { extractScale } from '../../util/scale';
import { extractAxis } from '../../util/axis';
import * as StyleParser from '../../util/styleParser';
import './guide/label/bar-label';

interface BarStyle {
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

  protected _adjustBar(bar: ElementOption) {
    return;
  }

  protected _addElements() {
    const props = this._initialProps;
    const bar: ElementOption = {
      type: 'interval',
      position: {
        fields: [ props.yField, props.xField ],
      },
    };
    if (props.barStyle) bar.style = this._columnStyle();
    if (props.barSize) {
      bar.size = {
        values: [ props.barSize ],
      };
    }
    if (props.label) {
      bar.label = this._extractLabel();
    }
    if (props.color) {
      if (_.isString(props.color)) {
        bar.color = {
          values: [ props.color ],
        };
      } else if (_.isFunction(props.color)) {
        bar.color = {
          fields: [ props.xField, props.yField ],
          callback: props.color,
        };
      } else if (_.isArray(props.color)) {
        bar.color = {
          fields: [ props.yField ],
          values: props.color,
        };
      }
    }
    this._adjustBar(bar);
    this._setConfig('element', bar);
  }

  protected _interactions() {
  }

  protected _annotation() {}

  protected _animation() {
  }

  private _columnStyle() {
    const props = this._initialProps;
    const barStyleProps = props.barStyle;
    const config = {
      fields: null,
      callback: null,
      cfg: null,
    };
    config.cfg = barStyleProps;
    return config;
  }

  protected _extractLabel() {
    const props = this._initialProps;
    const label = props.label as Label;

    if (label && label.visible === false) return false;

    const labelConfig = {
      labelType: 'barLabel',
      fields: [ props.xField ],
      callback: null,
      ...label,
    };
    const callbackOptions: ILabelCallbackOptions = { ...label };
    if (label.formatter) {
      callbackOptions.content = labelConfig.formatter;
    }
    /**统一处理callback */
    if (!_.isEmpty(callbackOptions)) {
      labelConfig.callback = (val1, val2) => {
        const returnCfg = _.clone(callbackOptions);
        if (_.has(callbackOptions, 'content')) {
          returnCfg.content = callbackOptions.content(val1, val2);
        }
        return returnCfg;
      };
    }
    /** label样式 */
    if (label.style) {
      const theme = this._config.theme;
      StyleParser.LabelStyleParser(theme, label.style);
    }

    return labelConfig as any;
  }

}
