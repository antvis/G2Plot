import { Options, StyleAttr } from '../../types';

/** mini 图类型定义需要 omit 很多的 G2 Options 配置 */
export interface TinyColumnOptions extends Omit<Options, 'data' | 'legend' | 'label'> {
  /** 具体的数据 */
  readonly data: number[];
  /** 柱状图宽度占比 [0-1] */
  readonly columnWidthRatio?: number;
  /** 迷你柱形图形样式 */
  readonly columnStyle?: StyleAttr;
}
