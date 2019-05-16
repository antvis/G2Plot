import BaseColumn, { ColumnConfig } from '../column';
import { ElementOption } from '../../interface/config';
import { isArray, isFunction } from 'util';

interface StackColumnConfig extends ColumnConfig {
  stackField: string;
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
}
