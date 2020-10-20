import { Options, StyleAttr } from '../../types';

export interface BidirectionalBarOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴映射字段 */
  readonly yField: string;
  /** seriesField 比较字段 */
  readonly seriesField: string;
  /** 柱状图宽度占比 [0-1] */
  readonly barWidthRatio?: number;
  /** 柱子样式配置，可选 */
  readonly barStyle?: StyleAttr;
}
