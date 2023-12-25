import type { Options } from '../../types/common';

export type BoxOptions = Options & {
  // box 预处理, boxplot 非预处理
  boxType: 'boxplot' | 'box';
};
