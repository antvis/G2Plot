import type { Options } from '../../types/common';

export type TinyProgressOptions = Options & {
  // 进度
  percent: number;
  // 颜色
  color?: string[];
};
