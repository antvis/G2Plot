import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface ColumnOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴字段 */
  readonly yField: string;
  /** 颜色字段，可选 */
  readonly colorField?: string;
  /** 拆分字段，在分组柱状图下同 groupField、colorField，在堆积柱状图下同 stackField、colorField  */
  readonly seriesField?: string;
  /** 是否分组柱形图 */
  readonly isGroup?: boolean;
  /** 分组拆分字段 */
  readonly groupField?: string;
  /** 是否堆积柱状图 */
  readonly isStack?: boolean;
  /** 堆积拆分字段 */
  readonly stackField?: string;
  /** 柱状图宽度占比 [0-1] */
  readonly columnWidthRatio?: number;
  /** 分组中柱子之间的间距 [0-1]，仅对分组柱状图适用 */
  readonly marginRatio?: number;
  /** 柱子样式配置，可选 */
  readonly columnStyle?: ShapeStyle | ((x: any, y: any, color?: any) => ShapeStyle);
}
