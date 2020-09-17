import { Options, Statistic, StyleAttr } from '../../types';

export type StatisticData = {
  title: string;
  value: string | number | null;
};

export interface PieOptions extends Options {
  /** 角度映射字段 */
  readonly angleField: string;
  /** 颜色映射字段 */
  readonly colorField?: string;
  /** 饼图半径 */
  readonly radius?: number;
  /** 饼图内半径 */
  readonly innerRadius?: number;
  /** 饼图图形样式 */
  readonly pieStyle?: StyleAttr;
  /**
   * 指标卡组件: 显示在环图中心，可以代替tooltip，显示环图数据的总计值和各项数据
   * 启用 statistic 组件的同时将自动关闭tooltip
   */
  readonly statistic?: Statistic;
}
