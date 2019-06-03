import BaseBar, { BarConfig } from '../bar';
import { ElementOption } from '../../interface/config';
import { isArray, isFunction } from 'util';

export interface GroupBarConfig extends BarConfig {
  groupField: string;
}

export default class GroupBar extends BaseBar<GroupBarConfig> {
  protected _adjustBar(bar: ElementOption) {
    const props = this._initialProps;

    bar.adjust = [ {
      type: 'dodge',
    } ];

    if (props.groupField) {
      bar.color = {
        fields: [ props.groupField ],
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
