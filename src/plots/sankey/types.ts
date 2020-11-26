import { Options } from '../../types';

/** 配置类型定义 */
export interface SankeyOptions extends Omit<Options, 'xField' | 'yField' | 'xAxis' | 'yAxis'> {
  /** 来源字段 */
  readonly sourceField?: string;
  /** 去向字段 */
  readonly targetField?: string;
  /** 权重字段 */
  readonly weightField?: string;
}
