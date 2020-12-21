import { ShapeAttrs } from '@antv/g-base';
import { Options } from '../../types';

/** 配置类型定义 */
export interface RadialBarOptions extends Options {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 样式 */
  readonly barStyle?: ShapeAttrs;
  /** 最大旋转角度 0~360 */
  readonly maxAngle?: number;
  /** 圆半径 */
  readonly radius?: number;
  /** 圆内半径 */
  readonly innerRadius?: number;
  /** 颜色字段 */
  readonly colorField?: string;
  /** 类型 */
  readonly type?: string;
}
