import { ColumnOptions } from '../column/types';

// rename column to bar
export interface BarOptions
  extends Omit<ColumnOptions, 'columnStyle' | 'columnWidthRatio' | 'minColumnWidth' | 'maxColumnWidth'> {
  readonly barStyle?: ColumnOptions['columnStyle'];
  readonly barWidthRatio?: ColumnOptions['columnWidthRatio'];
  /** 条形图最小宽度（像素） */
  readonly minBarWidth?: ColumnOptions['minColumnWidth'];
  /** 条形图最大宽度（像素） */
  readonly maxBarWidth?: ColumnOptions['maxColumnWidth'];
  /** 条形图柱子的背景 */
  readonly barBackground?: ColumnOptions['columnBackground'];
}
