import type { Options, AttrStyle } from '../../types/common';

export type WaterfallOptions = Omit<Options, 'xField' | 'children'> & {
  /**
   * @title 连线样式
   */
  linkStyle?: AttrStyle;
  /**
   * @title x轴字段
   */
  xField?: string | string[];
  children?: Array<WaterfallOptions & { zIndex?: number }>;
};
