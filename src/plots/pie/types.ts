import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export type StatisticData = {
  title: string;
  value: string | number | null;
  color?: string;
};

/**
 * 中心文本
 */
type Statistic = Readonly<{
  /** 自定义 title 标签 */
  title?: {
    formatter?: (type: string, data: StatisticData) => string;
    rotate?: number;
    offsetX?: number;
    offsetY?: number;
    style?: ShapeStyle;
  };
  /** 自定义 content 内容 */
  content?: {
    formatter?: (type: string, data: StatisticData) => string;
    rotate?: number;
    offsetX?: number;
    offsetY?: number;
    style?: ShapeStyle;
  };
  // todo 提供 htmlContent 的方式，自由定制中心文本
}>;

export interface PieOptions extends Options {
  /** 角度映射字段 */
  readonly angleField: string;
  readonly colorField?: string;
  readonly radius?: number;
  readonly innerRadius?: number;

  /** 饼图图形样式 */
  readonly pieStyle?: ShapeStyle | ((...args: string[]) => ShapeStyle);

  /**
   * 指标卡组件: 显示在环图中心，可以代替tooltip，显示环图数据的总计值和各项数据
   * 启用 statistic 组件的同时将自动关闭tooltip
   */
  readonly statistic?: Statistic;
}
