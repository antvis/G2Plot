import { ChartOptions } from '../../types';
import { ShapeStyle } from '../../types/style';

/** mini 图的配置继承自 ChartOptions，因为很多的 G2 图形配置都不需要 */
export interface RingProgressOptions extends ChartOptions {
  // 通用数据配置
  /** 进度百分比 */
  readonly percent: number;
  /** 外环的半径 */
  readonly radius: number;
  /** 内环的半径 */
  readonly innerRadius: number;
  /** 进度条颜色 */
  readonly color?: string[] | ((percent: number) => string[]);
  /** 数据字段元信息 */
  readonly meta?: Record<string, any>;
  /** 进度条样式 */
  readonly progressStyle?: ShapeStyle | ((x?: any, percent?: number, type?: string) => ShapeStyle);
}
