import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

/** mini 图类型定义需要 omit 很多的 G2 Options 配置 */
export interface RingProgressOptions extends Omit<Options, 'data' | 'color'> {
  /** 进度百分比 */
  readonly percent: number;
  /** 外环的半径 */
  readonly radius?: number;
  /** 内环的半径 */
  readonly innerRadius?: number;
  /** 进度条颜色 */
  readonly color?: string[] | ((percent: number) => string[]);
  /** 进度条样式 */
  readonly progressStyle?: ShapeStyle | ((x?: any, percent?: number, type?: string) => ShapeStyle);
}
