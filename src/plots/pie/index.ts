import * as _ from '@antv/util';
import BasePlot from '../../base/plot';
import BaseConfig, { ElementOption, IColorConfig, Label } from '../../interface/config';
import { extractScale } from '../../util/scale';
import * as StyleParser from '../../util/styleParser';
import * as EventParser from './event';
import { CoordinateType } from '@antv/g2/lib/plot/interface';
import SpiderLabel from './guide/label/spiderLabel';

export interface PieConfig extends BaseConfig {
  angleField: string;
  colorField?: string;
  radius?: number;
  pieStyle?: {};
}

interface ILabelCallbackOptions {
  content?: Function;
  offset?: number;
  textStyle?: {};
}

export default class PiePlot<T extends PieConfig = PieConfig> extends BasePlot<T>{
  pie: any;
  spiderLabel: any;
  protected _setDefaultG2Config() { }

  protected _scale() {
    const props = this._initialProps;
    const scales = {};
    /** 配置x-scale */
    scales[props.angleField] = {};
    _.has(props, 'xAxis') && extractScale(scales[props.angleField], props.xAxis);
  }

  protected _axis() { }

  protected _coord() {
    const props = this._initialProps;
    const coordConfig = {
      type: 'theta' as CoordinateType,
      cfg: {
        radius: 0.8, // default radius值
      },
    };
    if (_.has(props, 'radius')) {
      coordConfig.cfg.radius = props.radius;
    }
    this._setConfig('coord', coordConfig);
  }

  protected _addElements() {
    const props = this._initialProps;
    const pie: ElementOption = {
      type: 'interval',
      position: {
        fields: [ props.angleField ],
      },
      adjust: [ {
        type: 'stack',
      } ],
    };
    if (props.colorField || props.color) pie.color = this._pieColor();
    pie.style = this._pieStyle();
    this.pie = pie;
    if (props.label) {
      this._label();
    }
    this._setConfig('element', pie);
  }

  protected _animation() {
    const props = this._initialProps;
    if (props.animation === false) {
      /**关闭动画 */
      this.pie.animate = false;
    }
  }

  protected _annotation() { }

  protected _interactions() { }

  protected _events(eventParser) {
    super._events(EventParser);
  }

  protected _afterInit() {
    super._afterInit();
    const props = this._initialProps;
    /**蜘蛛布局label */
    if (props.label) {
      const labelConfig = props.label as Label;
      if (labelConfig.type === 'spider') {
        const spiderLabel = new SpiderLabel({
          view: this.plot,
          fields: props.colorField ? [ props.angleField, props.colorField ] : [ props.angleField ],
          style: labelConfig.style ? labelConfig.style : {},
          formatter: props.label.formatter ? props.label.formatter : false,
        });
        this.spiderLabel = spiderLabel;
      }
    }
  }

  private _pieColor() {
    const props = this._initialProps;
    const config: IColorConfig = {};
    if (_.has(props, 'colorField')) {
      config.fields = [ props.colorField ];
    }
    if (_.has(props, 'color')) {
      const color = props.color;
      if (_.isString(color)) {
        config.values = [ color as string ];
      } else {
        config.values = color as [];
      }
    }
    return config;
  }

  private _pieStyle() {
    const props = this._initialProps;
    const defaultStyle = props.colorField ? {} : { stroke: 'white', lineWidth: 1 };
    if (props.pieStyle) {
      const pieStyleProps = _.deepMix(props.pieStyle, defaultStyle);
      const config = {
        fields: null,
        callback: null,
        cfg: null,
      };
      if (_.isFunction(pieStyleProps) && props.colorField) {
        config.fields = [ props.colorField ];
        config.callback = pieStyleProps;
        return config;
      }
      config.cfg = pieStyleProps;
      return config;
    }
    return defaultStyle;

  }

  private _label() {
    const props = this._initialProps;
    const labelConfig = props.label as Label;
    if (labelConfig  && labelConfig .visible === false) {
      this.pie.label = false;
      return;
    }
    this.pie.label = {
      fields: props.colorField ? [ props.angleField, props.colorField ] : [ props.angleField ],
    };
    const callbackOptions: ILabelCallbackOptions = {};
    /**outter label */
    // TODO: labelLine 加入 theme
    /**inner label */
    if (labelConfig.type === 'inner') {
      const offsetBase = -20;
      callbackOptions.offset = labelConfig.offset ? offsetBase + labelConfig.offset : offsetBase;
    }
    if (labelConfig.type === 'spider') {
      /**如label type为spider，则关闭default label*/
      this.pie.label = null;
    }
    /**formatter */
    if (labelConfig.formatter) {
      callbackOptions.content = labelConfig.formatter;
    }
    /** label样式 */
    if (labelConfig.style) {
      const theme = this._config.theme;
      StyleParser.LabelStyleParser(theme, labelConfig.style);
      /** inner label需要在callback里设置样式，否则会失效 */
      if (labelConfig.type === 'inner') {
        callbackOptions.textStyle = labelConfig.style;
      }
    }
    /**统一处理callback */
    if (this.pie.label && !_.isEmpty(callbackOptions)) {
      this.pie.label.callback = (val1, val2) => {
        const returnCfg = _.clone(callbackOptions);
        if (_.has(callbackOptions, 'content')) {
          returnCfg.content = callbackOptions.content(val1, val2);
        }
        return returnCfg;
      };
    }
  }
}
