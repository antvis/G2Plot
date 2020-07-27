import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface BarOptions extends Options {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 颜色字段，可选 */
  readonly colorField?: string;
  /** 柱子样式配置，可选 */
  readonly barStyle?: ShapeStyle | ((x: any, y: any, color?: any) => ShapeStyle);
}
