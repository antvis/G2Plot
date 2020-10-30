import { ShapeAttrs } from '@antv/g-base/lib/types';
import { Options } from '../../types';

/** 配置类型定义 */
export interface RadialBarOptions extends Options {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 样式 */
  readonly barStyle?: ShapeAttrs;
  /** 最大弧度 0~360 */
  readonly maxRadian?: number;
  /** 圆半径 */
  readonly radius?: number;
  /** 圆内半径 */
  readonly innerRadius?: number;
}
