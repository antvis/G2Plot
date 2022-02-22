import { Options, Statistic, StyleAttr } from '../../types';
import { Label } from '../../types/label';

export type StatisticData = {
  title: string;
  value: string | number | null;
};

export interface PieOptions extends Options {
  /**
   * @title 角度映射字段
   */
  readonly angleField: string;
  /**
   * @title 颜色映射字段
   */
  readonly colorField: string;
  /**
   * @title 饼图半径
   */
  readonly radius?: number;
  /**
   * @title 饼图内半径
   */
  readonly innerRadius?: number;
  /**
   * @title 饼图标签
   * @description type: 'inner' | 'outer' | 'spider'
   */
  readonly label?: Label;
  /**
   * @title 饼图图形样式
   */
  readonly pieStyle?: StyleAttr;
  // 设置扇形图
  /**
   * @title 圆环的开始角度
   */
  readonly startAngle?: number;
  /**
   * @title 圆环的结束角度
   */
  readonly endAngle?: number;
  /**
   * @title 指标卡组件
   * @description 显示在环图中心，可以代替tooltip，显示环图数据的总计值和各项数据,启用 statistic 组件的同时将自动关闭tooltip
   */
  readonly statistic?: Statistic;
}
