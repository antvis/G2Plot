import { Data, Options, StyleAttr } from '../../types';
import { NodeDepth, NodeSort } from './layout';

/** 配置类型定义 */
export interface SankeyOptions extends Omit<Options, 'xField' | 'yField' | 'xAxis' | 'yAxis'> {
  /**
   * 来源字段
   */
  readonly sourceField: string;
  /**
   * 去向字段
   */
  readonly targetField: string;
  /**
   * 权重字段
   */
  readonly weightField: string;
  /**
   * 数据
   */
  readonly data: Data;
  /**
   * 节点宽度的比如，参考画布的宽度，默认值为 0.008
   */
  readonly nodeWidthRatio?: number;
  /**
   * 节点宽度的像素设置，优先级高于 nodeWidthRatio
   */
  readonly nodeWidth?: number;
  /**
   * 节点之间的间距比例，参考画布高度，默认值为 0.03
   */
  readonly nodePaddingRatio?: number;
  /**
   * 节点间距的像素设置，优先级高于 nodePaddingRatio
   */
  readonly nodePadding?: number;
  /**
   * 节点对齐的方式，默认为 justify
   */
  readonly nodeAlign?: 'left' | 'right' | 'center' | 'justify';
  /**
   * 节点排序方式，默认为空
   */
  readonly nodeSort?: NodeSort;
  /**
   * 节点排放分层的顺序，从 0 开始，并且返回值需要保证所有的层级都有节点
   */
  readonly nodeDepth?: NodeDepth;
  /**
   * 节点样式
   */
  readonly nodeStyle?: StyleAttr;
  /**
   * 边样式
   */
  readonly edgeStyle?: StyleAttr;
}
