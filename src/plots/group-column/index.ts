import { isArray, isFunction } from 'util';
import { ElementOption } from '../../interface/config';
import BaseColumn, { ColumnConfig } from '../column';

export interface GroupColumnConfig extends ColumnConfig {
  groupField: string;
}

export default class GroupColumn extends BaseColumn<GroupColumnConfig> {
  protected _adjustColumn(column: ElementOption) {
    const props = this._initialProps;

    column.adjust = [
      {
        type: 'dodge',
      },
    ];

    /*if (props.groupField) {
      column.color = {
        fields: [ props.groupField ],
        values: props.color && isArray(props.color) ? props.color : undefined,
        callback: this._colorCallback(props.color),
      };
    }*/
  }

  /*private _colorCallback(color) {
    if (!color) return;

    if (isFunction(color)) return color;

    return (d) => {
      return color[d];
    };
  }*/
}
