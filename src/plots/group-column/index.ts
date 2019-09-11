import { isArray, isFunction } from 'util';
import { ElementOption } from '../../interface/config';
import BaseColumn, { ColumnConfig } from '../column';

export interface GroupColumnConfig extends ColumnConfig {
  groupField: string;
}

export default class GroupColumn extends BaseColumn<GroupColumnConfig> {
  protected setType() {
    this.type = 'groupColumn';
  }
  protected _adjustColumn(column: ElementOption) {
    column.adjust = [
      {
        type: 'dodge',
      },
    ];
  }
}
