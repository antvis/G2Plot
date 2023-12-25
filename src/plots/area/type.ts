import type { Options, ConnectNulls } from '../../types/common';

export type AreaOptions = Omit<Options, 'yField'> & {
  /**
   * @title y轴字段
   */
  readonly yField?: string | string[];
  /**
   * @title 链接空值
   */
  readonly connectNulls?: ConnectNulls;
};
