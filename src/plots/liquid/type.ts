import type { Options } from '../../types/common';

export type LiquidOptions = Omit<Options, 'data'> & {
  /**
   * @title 进度
   * @description [0-1]
   */
  percent?: number;
};
