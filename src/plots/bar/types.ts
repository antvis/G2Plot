import { ColumnOptions } from '../column/types';

// rename column to bar
export interface BarOptions
  extends Omit<ColumnOptions, 'columnStyle' | 'columnWidthRatio' | 'minColumnWidth' | 'maxColumnWidth'> {
  /**
   * @title 柱状图柱子样式配置
   */
  readonly barStyle?: ColumnOptions['columnStyle'];
  /**
   * @title 柱状图宽度占比
   * @description 范围[0-1]
   */
  readonly barWidthRatio?: ColumnOptions['columnWidthRatio'];
  /**
   * @title 条形图最小宽度（像素）
   */
  readonly minBarWidth?: ColumnOptions['minColumnWidth'];
  /**
   * @title 条形图最大宽度（像素）
   */
  readonly maxBarWidth?: ColumnOptions['maxColumnWidth'];
  /**
   * @title 条形图柱子的背景配置
   */
  readonly barBackground?: ColumnOptions['columnBackground'];
}
