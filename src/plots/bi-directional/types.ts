import { Options, StyleAttr } from '../../types';

export interface BidirectionalOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴映射字段 */
  readonly yField: string;
  /** seriesField 比较字段 */
  readonly seriesField: string;
  /** 分组中柱子之间的间距 [0-1]，仅对分组柱状图适用 */
  readonly marginRatio?: number;
  /** 柱状图宽度占比 [0-1] */
  readonly columnWidthRatio?: number;
  /** 柱子样式配置，可选 */
  readonly columnStyle?: StyleAttr;
}
