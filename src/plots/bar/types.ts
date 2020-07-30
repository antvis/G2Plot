import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface BarOptions extends Options {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 颜色字段，可选 */
  readonly colorField?: string;
  /** 是否 堆积条形图, 默认 分组柱状图 */
  readonly isStack?: boolean;
  /** 柱子宽度占比 [0-1] */
  readonly marginRatio?: number;
  /** 分组或堆叠内部的间距，像素值 */
  readonly innerPadding?: number;
  /** 柱子样式配置，可选 */
  readonly barStyle?: ShapeStyle | ((x: any, y: any, color?: any) => ShapeStyle);
}
