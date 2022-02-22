import { Data, Options, State, StyleAttr } from '../../types';
import { NodeDepth, NodeSort } from './layout';

/**
 * @title node-link 数据类型的结构
 */
export type NodeLinkData = {
  /**
   * @title 节点数据
   */
  readonly nodes: {
    /**
     * @title id
     * @description 唯一即可，一般可以直接等于 name
     */
    readonly id: string;
    /**
     * @title 节点的名称
     * @description 用于 UI 上的现实
     */
    readonly name: string;
    /**
     * @title 节点的值
     * @description 不传则节点大小有来源求和决定
     */
    readonly fixedValue?: number;
  }[];

  readonly links: {
    /**
     * @title 来源节点
     * @description 在 nodes 中的 index
     */
    readonly source: number;
    /**
     * @title 目标节点
     * @description  在 nodes 中的 index
     */
    readonly target: number;
    /**
     * @title 边的值
     */
    readonly value: number;
  }[];
};

/**
 * @title 配置类型定义
 */
export interface SankeyOptions extends Omit<Options, 'data' | 'xField' | 'yField' | 'xAxis' | 'yAxis'> {
  /**
   * @title 数据集的类型
   * @description 数据集的类型 'node-link' | 'detail'
   * @default "detail"
   */
  readonly dataType?: 'node-link' | 'detail';
  /**
   * @title 来源字段
   * @description dataType = 'node-link' 的时候，不用传
   */
  readonly sourceField?: string;
  /**
   * @title 去向字段
   * @description dataType = 'node-link' 的时候，不用传
   */
  readonly targetField?: string;
  /**
   * @title 权重字段
   * @description dataType = 'node-link' 的时候，不用传
   */
  readonly weightField?: string;
  /**
   * @title 附加的元字段
   */
  readonly rawFields?: string[];
  /**
   * @title 数据
   */
  readonly data: Data | NodeLinkData;
  /**
   * @title 节点宽度
   * @description 参考画布的宽度
   * @default 0.008
   */
  readonly nodeWidthRatio?: number;
  /**
   * @title 节点宽度的像素设置
   * @description 优先级高于 nodeWidthRatio
   */
  readonly nodeWidth?: number;
  /**
   * @title 节点之间的间距比例
   * @description 参考画布高度
   * @default 0.03
   */
  readonly nodePaddingRatio?: number;
  /**
   * @title 节点间距的像素设置
   * @description 优先级高于 nodePaddingRatio
   */
  readonly nodePadding?: number;
  /**
   * @title 节点对齐的方式
   * @description 节点对齐的方式 'left' | 'right' | 'center' | 'justify'
   * @default "justify"
   */
  readonly nodeAlign?: 'left' | 'right' | 'center' | 'justify';
  /**
   * @title 节点排序方式
   */
  readonly nodeSort?: NodeSort;
  /**
   * @title 节点排放分层的顺序
   * @description 从 0 开始，并且返回值需要保证所有的层级都有节点
   */
  readonly nodeDepth?: NodeDepth;
  /**
   * @title 节点样式
   */
  readonly nodeStyle?: StyleAttr;
  /**
   * @title 节点状态样式
   */
  readonly nodeState?: State;
  /**
   * @title 边样式
   */
  readonly edgeStyle?: StyleAttr;
  /**
   * @title 边状态样式
   */
  readonly edgeState?: State;
  /**
   * @title 节点位置是否可以拖拽
   * @default false
   */
  readonly nodeDraggable?: boolean;
  /**
   * @title 边交互
   */
  readonly edgeInteractions?: Options['interactions'];
  /**
   * @title 节点交互
   */
  readonly nodeInteractions?: Options['interactions'];
}
