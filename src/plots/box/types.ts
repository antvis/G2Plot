import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface BoxOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴映射 box range [low, q1, median, q3, hight] 五个字段 */
  readonly yField: [string?, string?, string?, string?, string?];
  /** 箱形样式配置，可选 */
  readonly boxStyle?: ShapeStyle | ((...args: string[]) => ShapeStyle);
}
