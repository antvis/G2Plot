import { Options } from '../../types';

export interface HistogramOptions extends Options {
  /** 设置直方图绘制 (进行分箱) 的字段 */
  readonly binField: string;

  /**
   *  设置直方图的分箱宽度，binWidth 影响直方图分成多少箱,
   *  不能与binNumber一起使用
   */
  readonly binWidth?: number;

  /** 设置直方图的分箱数量，binNumber 影响直方图分箱后每个柱子的宽度 */
  readonly binNumber?: number;

  /** 指定直方图柱形颜色 */
  readonly color?: string;

  /** 指定交互形式 ，目前支持这3种比较友好 */
  readonly interaction?: 'active-region' | 'element-highlight' | 'element-active';
}
