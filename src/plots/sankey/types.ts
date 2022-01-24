import { Data, Options, State, StyleAttr } from '../../types';
import { NodeDepth, NodeSort } from './layout';

/**
 * node-link 数据类型的结构
 */
export type NodeLinkData = {
  /**
   * 节点数据
   */
  readonly nodes: {
    /**
     * id 唯一即可，一般可以直接等于 name
     */
    readonly id: string;
    /**
     * 节点的名称，用于 UI 上的现实
     */
    readonly name: string;
    /**
     * 节点的值，不传则节点大小有来源求和决定
     */
    readonly fixedValue?: number;
  }[];
  /**
   *
   */
  readonly links: {
    /**
     * 来源节点在 nodes 中的 index
     */
    readonly source: number;
    /**
     * 目标节点在 nodes 中的 index
     */
    readonly target: number;
    /**
     * 边的值
     */
    readonly value: number;
  }[];
};

/** 配置类型定义 */
export interface SankeyOptions extends Omit<Options, 'data' | 'xField' | 'yField' | 'xAxis' | 'yAxis'> {
  /**
   * 数据集的类型，默认为 detail
   */
  readonly dataType?: 'node-link' | 'detail';
  /**
   * 来源字段，dataType = 'node-link' 的时候，不用传
   */
  readonly sourceField?: string;
  /**
   * 去向字段，dataType = 'node-link' 的时候，不用传
   */
  readonly targetField?: string;
  /**
   * 权重字段，dataType = 'node-link' 的时候，不用传
   */
  readonly weightField?: string;
  /**
   * 附加的 元字段
   */
  readonly rawFields?: string[];
  /**
   * 数据
   */
  readonly data: Data | NodeLinkData;
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
   * 节点状态样式
   */
  readonly nodeState?: State;
  /**
   * 边样式
   */
  readonly edgeStyle?: StyleAttr;
  /**
   * 边状态样式
   */
  readonly edgeState?: State;
  /**
   * 节点位置是否可以拖拽，默认为 false
   */
  readonly nodeDraggable?: boolean;
  /**
   * 边交互
   */
  readonly edgeInteractions?: Options['interactions'];
  /**
   * 节点交互
   */
  readonly nodeInteractions?: Options['interactions'];
}
