import { Types } from '@antv/g2';
import { Options, StyleAttr } from '../../types';

export interface HeatmapOptions extends Options {
  /** 热力图类型 */
  readonly type?: 'polygon' | 'density';
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴字段 */
  readonly yField: string;
  /** 颜色字段，可选 */
  readonly colorField?: string;
  /** 点大小映射对应的数据字段名，可选 */
  readonly sizeField?: string;
  /** 热力格子中的形状，可选 */
  readonly shape?: string;
  /** 热力格子中图形的尺寸比例，可选，只有当 shape 和 sizeField 至少指定一项后才生效 */
  readonly sizeRatio?: number;
  /** 热力图形样式 */
  readonly heatmapStyle?: StyleAttr;
  /** 坐标轴映射 */
  readonly reflect?: 'x' | 'y';
  /** 极坐标属性 */
  readonly coordinate?: Types.CoordinateOption;
}
