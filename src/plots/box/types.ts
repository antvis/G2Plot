import { Options, StyleAttr } from '../../types';

export interface BoxOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴映射 box range [low, q1, median, q3, high] 五个字段 or 一个数组字段 */
  readonly yField: string | [string?, string?, string?, string?, string?];
  /** 箱型样式配置，可选 */
  readonly boxStyle?: StyleAttr;
  /** 分组拆分字段，默认是分组情况，颜色作为视觉通道 */
  readonly groupField?: string;
  /** 异常值字段 */
  readonly outliersField?: string;
  /** 异常值样式 */
  readonly outliersStyle?: StyleAttr;
}
