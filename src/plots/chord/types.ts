import { Data, Datum, Options, StyleAttr } from '../../types';

/** 配置类型定义 */
export interface ChordOptions extends Omit<Options, 'xField' | 'yField' | 'xAxis' | 'yAxis'> {
  /**
   * 来源字段
   */
  readonly sourceField: string;
  /**
   * 去向字段
   */
  readonly targetField: string;
  /**
   * 来源权重字段
   */
  readonly sourceWeightField: string;
  /**
   * 去向字段
   */
  readonly targetWeightField: string;
  /**
   * 数据
   */
  readonly data: Data;
  /**
   * 节点间距比例，参考画布的宽度，默认值为 0.1，取值为[0, 1)
   */
  readonly marginRatio?: number;
  /**
   * 刻度的厚度，默认值为0.05，取值为(0, 1)
   */
  readonly thickness?: number;
  /**
   * 是否考虑节点权重值
   */
  readonly weight?: boolean;
  /**
   * 节点排序方式，默认为空
   */
  readonly nodeSort?: (a: Datum, b: Datum) => number;
  /**
   * 节点样式
   */
  readonly nodeStyle?: StyleAttr;
  /**
   * 边样式
   */
  readonly edgeStyle?: StyleAttr;
}
