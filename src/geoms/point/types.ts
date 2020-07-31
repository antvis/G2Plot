
import { ShapeStyle } from '../../types/style';

export interface PointGeoConfig {
  /** 映射至 x 轴字段 */
  readonly xField: string;
  /** 映射至 y 轴字段 */
  readonly yField?: string;
  /** 映射至分组字段 */
  readonly seriesField?: string;

  /** point shape 映射 */
  readonly shape?: string | ((x?: any, y?: any, color?: any) => string);
  /** 大小映射 */
  readonly size?: number | ((x?: any, y?: any, color?: any) => number);
  /** 样式映射 */
  readonly style?: ShapeStyle | ((x?: any, y?: any, color?: any) => ShapeStyle);
}
