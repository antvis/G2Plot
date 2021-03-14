import { Options, Statistic, StyleAttr } from '../../types';
import { Label } from '../../types/label';

export type StatisticData = {
  title: string;
  value: string | number | null;
};

export interface PieOptions extends Options {
  /** 角度映射字段 */
  readonly angleField: string;
  /** 颜色映射字段 */
  readonly colorField: string;
  /** 饼图半径 */
  readonly radius?: number;
  /** 饼图内半径 */
  readonly innerRadius?: number;
  /** 饼图标签，type: 'inner' | 'outer' | 'spider' */
  readonly label?: Label;
  /** 饼图图形样式 */
  readonly pieStyle?: StyleAttr;
  // 设置扇形图
  /** 圆环的开始角度 */
  readonly startAngle?: number;
  /** 圆环的结束角度 */
  readonly endAngle?: number;
  /**
   * 指标卡组件: 显示在环图中心，可以代替tooltip，显示环图数据的总计值和各项数据
   * 启用 statistic 组件的同时将自动关闭tooltip
   */
  readonly statistic?: Statistic;
}
