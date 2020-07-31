import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface ColumnOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴字段 */
  readonly yField: string;
  /** 颜色字段，可选 */
  readonly colorField?: string;
  /** 是否 堆积柱状图, 默认 分组柱状图 */
  readonly isStack?: boolean;
  /** 柱状图宽度占比 [0-1] */
  readonly columnWidthRatio?: number;
  /** 分组中柱子之间的间距 [0-1]，仅对分组柱状图适用 */
  readonly marginRatio?: number;
  /** 柱子样式配置，可选 */
  readonly columnStyle?: ShapeStyle | ((x: any, y: any, color?: any) => ShapeStyle);
}
