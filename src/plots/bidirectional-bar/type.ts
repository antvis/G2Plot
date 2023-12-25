import type { Options } from '../../types/common';

export type BidirectionalBarOptions = Options & {
  /**
   * @title y轴字段
   */
  readonly yField?: string[];
  /**
   * @title 布局
   * @default "vertical"
   */
  layout: 'vertical' | 'horizontal';
};
