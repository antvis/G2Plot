import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface BoxOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴映射 box range [low, q1, median, q3, high] 五个字段 or 一个数组字段 */
  readonly yField: string | [string?, string?, string?, string?, string?];
  /** 箱型样式配置，可选 */
  readonly boxStyle?: ShapeStyle | ((x: string, _range: string) => ShapeStyle);
  /** 分组拆分字段，默认是分组情况，颜色作为视觉通道 */
  readonly groupField?: string;
  /** 异常值字段 */
  readonly outliersField?: string;
  /** 异常值样式 */
  readonly outliersStyle?: ShapeStyle | ((x: string, outlier: string) => ShapeStyle);
}
