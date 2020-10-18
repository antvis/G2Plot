import { Options, StyleAttr, SizeAttr } from '../../types';

export interface BiDirectionalOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴映射字段*/
  readonly yField: string;
  /** seriesField 比较字段*/
  readonly seriesField: string;
  /** size 颜色*/
  readonly size?: SizeAttr;
  /** 柱状图宽度占比 [0-1] */
  readonly columnWidthRatio?: number;
  /** 柱子样式配置，可选 */
  readonly columnStyle?: StyleAttr;
}
