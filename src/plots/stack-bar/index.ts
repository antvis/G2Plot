import BaseBar, { BarConfig } from '../bar';
import { ElementOption, Label } from '../../interface/config';
import { isArray, isFunction } from 'util';
import * as StyleParser from '../../util/styleParser';
import * as _ from '@antv/util';
import './guide/label/stackBar-label';

export interface StackBarConfig extends BarConfig {
  stackField: string;
}

interface ILabelCallbackOptions {
  content?: Function;
  offset?: number;
  offsetX?: number;
  offsetY?: number;
  textStyle?: {};
  position?: string;
}

export default class StackBar extends BaseBar<StackBarConfig> {
  protected _adjustBar(bar: ElementOption) {

    const props = this._initialProps;

    bar.adjust = [ {
      type: 'stack',
    } ];

    if (props.stackField) {
      bar.color = {
        fields: [ props.stackField ],
        values: props.color && isArray(props.color) ? props.color : undefined,
        callback: this._colorCallback(props.color),
      };
    }
  }

  private _colorCallback(color) {
    if (!color) return;

    if (isFunction(color)) return color;

    return (d) => {
      return color[d];
    };
  }

  protected _extractLabel() {
    const props = this._initialProps;
    const label = props.label as Label;

    if (label && label.visible === false) return false;

    const labelConfig = {
      labelType: 'stackBarLabel',
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
