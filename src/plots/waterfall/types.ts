import { Options, StyleAttr } from '../../types';

export interface WaterOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴字段 */
  readonly yField: string;
  /** 是否展示 总计 */
  readonly total?:
    | boolean
    | {
        /** 总计的标签 */
        label: string;
        style: StyleAttr;
      };
  /** 柱子间牵引线 */
  readonly leaderLine?:
    | boolean
    | {
        style: StyleAttr;
      };
  /** 柱状图宽度占比 [0-1] */
  readonly columnWidthRatio?: number;
  /** 分组中柱子之间的间距 [0-1]，仅对分组柱状图适用 */
  readonly marginRatio?: number;
  /** 柱子样式配置，可选 */
  readonly waterfallStyle?: StyleAttr;
}
