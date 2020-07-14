import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface PieOptions extends Options {
  /** 角度映射字段 */
  angleField: string;
  colorField?: string;
  radius: number;
  innerRadius?: number;

  /** 饼图图形样式 */
  pieStyle?: ShapeStyle | ((...args: string[]) => ShapeStyle);
}
