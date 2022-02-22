import { Options, StyleAttr } from '../../types';

export interface BoxOptions extends Options {
  /**
   * @title x轴字段
   */
  readonly xField: string;
  /**
   * @title y轴映射
   * @descriptionbox range [low, q1, median, q3, high] 五个字段 or 一个数组字段
   */
  readonly yField: string | [string?, string?, string?, string?, string?];
  /**
   * @title 箱型样式
   */
  readonly boxStyle?: StyleAttr;
  /**
   * @title 分组拆分字段
   * @default 分组情况，颜色作为视觉通道
   */
  readonly groupField?: string;
  /**
   * @title 异常值字段
   */
  readonly outliersField?: string;
  /**
   * @title 异常值样式
   */
  readonly outliersStyle?: StyleAttr;
}
