import { Data, Datum, Options, StyleAttr } from '../../types';

/** 配置类型定义 */
export interface ChordOptions extends Omit<Options, 'xField' | 'yField' | 'xAxis' | 'yAxis'> {
  /**
   * @title 来源字段
   */
  readonly sourceField: string;
  /**
   * @title 去向字段
   */
  readonly targetField: string;
  /**
   * @title 权重字段
   */
  readonly weightField: string;
  /**
   * @title 源字段
   */
  readonly rawFields?: string[];
  /**
   * @title 数据
   */
  readonly data: Data;
  /**
   * @title 节点间距比例
   * @description 参考画布的宽度,取值[0-1]
   * @default 0.1
   */
  readonly nodePaddingRatio?: number;
  /**
   * @title 节点的厚度
   * @description 取值[0-1]
   * @default 0.05
   */
  readonly nodeWidthRatio?: number;
  /**
   * @title 节点排序方式
   */
  readonly nodeSort?: (a: Datum, b: Datum) => number;
  /**
   * @title 节点样式
   */
  readonly nodeStyle?: StyleAttr;
  /**
   * @title 边样式
   */
  readonly edgeStyle?: StyleAttr;
}
