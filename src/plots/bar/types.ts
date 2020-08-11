import { ColumnOptions } from '../column/types';

// rename column to bar
export interface BarOptions extends Omit<ColumnOptions, 'columnStyle' | 'columnWidthRatio'> {
  readonly barStyle?: ColumnOptions['columnStyle'];
  readonly barWidthRatio?: ColumnOptions['columnWidthRatio'];
}
