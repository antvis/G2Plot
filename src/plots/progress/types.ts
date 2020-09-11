import { Options, StyleAttr, ColorAttr } from '../../types';

/** mini 图类型定义需要 omit 很多的 G2 Options 配置 */
export interface ProgressOptions extends Omit<Options, 'data' | 'color'> {
  /** 进度百分比 */
  readonly percent: number;
  /** 条图宽度占比 [0-1] */
  readonly barWidthRatio?: number;
  /** 进度条颜色 */
  readonly color?: ColorAttr;
  /** 进度条样式 */
  readonly progressStyle?: StyleAttr;
}
