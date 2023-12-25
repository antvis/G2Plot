import type { Options, ConnectNulls } from '../../types/common';

export type LineOptions = Options & {
  /**
   * @title 链接空值
   */
  readonly connectNulls?: ConnectNulls;
};
