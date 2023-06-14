import { assign, isFunction, isString } from '@antv/util';
import { Datum } from '../../types';
import { center, justify, left, right, sankey } from './sankey';

const ALIGN_METHOD = {
  left,
  right,
  center,
  justify,
};

type InputNode = {
  readonly name: string;
};

type InputLink = {
  readonly source: number;
  readonly target: number;
  readonly value: number;
};

type OutputNode = {
  readonly name: string;
  readonly x0: number;
  readonly x1: number;
  readonly y0: number;
  readonly y1: number;
  readonly depth: number;
  readonly value: number;

  // 用于绘制 polygon
  x: number[];
  y: number[];
};

type OutputLink = {
  readonly source: OutputNode;
  readonly target: OutputNode;
  readonly value: number;
  readonly width: number;
  readonly y0: number;
  readonly y1: number;

  // 用于绘制 edge
  x?: number[];
  y?: number[];
};

/**
 * 桑基图布局的数据结构定义
 */
export type SankeyLayoutInputData = {
  readonly nodes: InputNode[];
  readonly links: InputLink[];
};

type SankeyLayoutOutputData = {
  readonly nodes: OutputNode[];
  readonly links: OutputLink[];
};

/**
 * 对齐方式的类型定义
 */
export type NodeAlign = keyof typeof ALIGN_METHOD | ((...args: any[]) => any);

/**
 * 节点的 depth 自定义
 */
export type NodeDepth = (datum: Datum, maxDepth: number) => number;

/**
 * 节点排序方法的类型定义
 */
export type NodeSort = (a: Datum, b: Datum) => number;

/**
 * 布局参数的定义
 */
export type SankeyLayoutOptions = {
  readonly nodeId?: (node: Datum) => any;
  // readonly value?: (node: Datum) => any;
  // readonly source?: (edge: Datum) => any;
  // readonly target?: (edge: Datum) => any;
  // sankey.nodeSort(undefined) is the default and resorts by ascending breadth during each iteration.
  // sankey.nodeSort(null) specifies the input order of nodes and never sorts.
  // sankey.nodeSort(function) specifies the given order as a comparator function and sorts once on initialization.
  readonly nodeSort?: (a: any, b: any) => number;
  readonly nodeAlign?: NodeAlign;
  readonly nodeWidth?: number;
  readonly nodePadding?: number;
  readonly nodeDepth?: NodeDepth;
};

/**
 * 默认值
 */
const DEFAULT_OPTIONS: Partial<SankeyLayoutOptions> = {
  nodeId: (node: Datum) => node.index,
  nodeAlign: 'justify',
  nodeWidth: 0.008,
  nodePadding: 0.03,
  nodeSort: undefined,
};

/**
 * 获得 align function
 * @param nodeAlign
 * @param nodeDepth
 */
export function getNodeAlignFunction(nodeAlign: NodeAlign) {
  const func = isString(nodeAlign) ? ALIGN_METHOD[nodeAlign] : isFunction(nodeAlign) ? nodeAlign : null;

  return func || justify;
}

export function getDefaultOptions(sankeyLayoutOptions: SankeyLayoutOptions) {
  return assign({}, DEFAULT_OPTIONS, sankeyLayoutOptions);
}

/**
 * 桑基图利用数据进行布局的函数，最终返回节点、边的位置（0 - 1 的信息）
 * 将会修改 data 数据
 * @param sankeyLayoutOptions
 * @param data
 */
export function sankeyLayout(
  sankeyLayoutOptions: SankeyLayoutOptions,
  data: SankeyLayoutInputData
): SankeyLayoutOutputData {
  const options = getDefaultOptions(sankeyLayoutOptions);

  const { nodeId, nodeSort, nodeAlign, nodeWidth, nodePadding, nodeDepth } = options;

  const sankeyProcessor = sankey()
    // .links((d: any) => d.links)
    // .nodes((d: any) => d.nodes)
    .nodeSort(nodeSort)
    .nodeWidth(nodeWidth)
    .nodePadding(nodePadding)
    .nodeDepth(nodeDepth)
    .nodeAlign(getNodeAlignFunction(nodeAlign))
    .extent([
      [0, 0],
      [1, 1],
    ])
    .nodeId(nodeId);

  // 进行桑基图布局处理
  const layoutData: SankeyLayoutOutputData = sankeyProcessor(data);

  // post process (x, y), etc.
  const nodes = layoutData.nodes
    .map((node) => {
      const { x0, x1, y0, y1 } = node;
      /* points
       * 3---2
       * |   |
       * 0---1
       */
      node.x = [x0, x1, x1, x0];
      node.y = [y0, y0, y1, y1];

      return node;
    })
    .filter((node) => {
      return node.name !== null;
    });

  const links = layoutData.links
    .map((edge) => {
      const { source, target } = edge;
      const sx = source.x1;
      const tx = target.x0;
      edge.x = [sx, sx, tx, tx];
      const offset = edge.width / 2;
      edge.y = [edge.y0 + offset, edge.y0 - offset, edge.y1 + offset, edge.y1 - offset];

      return edge;
    })
    .filter((edge) => {
      const { source, target } = edge;
      return source.name !== null && target.name !== null;
    });

  return { nodes, links };
}
