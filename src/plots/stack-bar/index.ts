import BaseBar, { BarConfig } from '../bar';
import { ElementOption } from '../../interface/config';
import { isArray, isFunction } from 'util';

export interface StackBarConfig extends BarConfig {
  stackField: string;
}

export default class StackBar extends BaseBar<StackBarConfig> {
  protected _adjustColumn(bar: ElementOption) {
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
}
