import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface BoxOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴映射 box range [low, q1, median, q3, high] 五个字段 */
  readonly yField: [string?, string?, string?, string?, string?];
  /** 箱型样式配置，可选 */
  readonly boxStyle?:
    | ShapeStyle
    | ((x: string, low?: number, q1?: number, median?: number, q3?: number, high?: number) => ShapeStyle);
  /** 拆分字段，在柱状图下同 groupField、colorField  */
  readonly seriesField?: string;
  /** 是否分组柱形图 */
  readonly isGroup?: boolean;
  /** 分组拆分字段 */
  readonly groupField?: string;
}
