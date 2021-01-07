import { ShapeAttrs } from '@antv/g2';
import { Options, StyleAttr } from '../../types';
import { OptionWithConversionTag } from '../../adaptor/conversion-tag';
import { OptionWithConnectedArea } from '../../adaptor/connected-area';

export interface ColumnOptions extends Options, OptionWithConversionTag, OptionWithConnectedArea {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴字段 */
  readonly yField: string;
  /** 拆分字段 */
  readonly seriesField?: string;
  /** 是否分组柱形图 */
  readonly isGroup?: boolean;
  /** 是否是区间柱状图 */
  readonly isRange?: boolean;
  /** 是否是百分比柱状图 */
  readonly isPercent?: boolean;
  /** 是否堆积柱状图 */
  readonly isStack?: boolean;
  /** 柱状图宽度占比 [0-1] */
  readonly columnWidthRatio?: number;
  /** 分组中柱子之间的间距 [0-1]，仅对分组柱状图适用 */
  readonly marginRatio?: number;
  /** 柱状图最小宽度（像素） */
  readonly minColumnWidth?: number;
  /** 柱状图最大宽度（像素） */
  readonly maxColumnWidth?: number;
  /** 柱状图柱子的背景 */
  readonly columnBackground?: { style?: ShapeAttrs };
  /** 柱子样式配置，可选 */
  readonly columnStyle?: StyleAttr;
  /** 分组字段，优先级高于 seriesField , isGroup: true 时会根据 groupField 进行分组。*/
  readonly groupField?: string;
}
