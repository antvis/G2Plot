import { Options } from '../../types';

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
  readonly shape?: string;
}
