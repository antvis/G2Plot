import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface PieOptions extends Options {
  /** 角度映射字段 */
  readonly angleField: string;
  readonly colorField?: string;
  readonly radius?: number;
  readonly innerRadius?: number;

  /** 饼图图形样式 */
  readonly pieStyle?: ShapeStyle | ((...args: string[]) => ShapeStyle);
}
