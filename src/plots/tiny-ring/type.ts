import type { Options } from '../../types/common';

export type TinyRingOptions = Options & {
  /**
   * @title 进度
   */
  percent: number;
  /**
   * @title 颜色
   * @description [ backgroundColor, progressColor]
   */
  color?: [string, string];
  /**
   * @title 内径
   * @description 0 ~ 1
   * @default 0.8
   */
  radius?: number;
};
