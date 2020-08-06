import { Options, tuple } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface HeatmapOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴字段 */
  readonly yField: string;
  /** 颜色字段，可选 */
  readonly colorField?: string;
  /** 点大小映射对应的数据字段名，可选 */
  readonly sizeField?: string;
  /** 热力格子中的形状，可选 */
  readonly shapeType?: string;
  /** 热力格子中图形的尺寸比例，可选，只有当 shapeType 和 sizeField 至少指定一项后才生效 */
  readonly sizeRatio?: number;
  /** 热力图形样式 */
  readonly heatmapStyle?: ShapeStyle | ((x: any, y: any, color: any) => ShapeStyle);
}

export const SHAPE_TYPES = tuple('circle', 'square');
export type ShapeType = typeof SHAPE_TYPES[number];
