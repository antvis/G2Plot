import { Options, StyleAttr, ColorAttr, Statistic } from '../../types';

/** 配置类型定义 */
export interface LiquidOptions extends Omit<Options, 'data'> {
  /** 指标比例 */
  readonly percent: number;
  /** 配置水波图的颜色，使用默认色板的颜色 */
  readonly color?: ColorAttr;
  /** 配置水波图的样式 */
  readonly liquidStyle?: StyleAttr;
  /** 水波的外半径， 0 ~ 1，默认为 0.9 */
  readonly radius?: number;
  /** 指标文本组件 */
  readonly statistic?: Statistic;
}
