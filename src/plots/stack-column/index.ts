import BaseColumn, { ColumnConfig } from '../column';
import { ElementOption } from '../../interface/config';
import { isArray, isFunction } from 'util';
import * as _ from '@antv/util';
import { Label } from '../../interface/config';
import * as StyleParser from '../../util/styleParser';
import './guide/label/stackColumn-label';

export interface StackColumnConfig extends ColumnConfig {
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

export default class StackColumn extends BaseColumn<StackColumnConfig> {
  protected _adjustColumn(column: ElementOption) {
    const props = this._initialProps;

    column.adjust = [ {
      type: 'stack',
    } ];

    if (props.stackField) {
      column.color = {
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
      ...label,
      labelType: 'stackColumnLabel',
      fields: [ props.yField ],
      callback: null,
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
