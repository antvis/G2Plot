import { assign, isString, isFunction } from '@antv/util';
import { sankey, sankeyLeft, sankeyRight, sankeyCenter, sankeyJustify } from 'd3-sankey';
import { Datum } from '../../types';

const ALIGN_METHOD = {
  left: sankeyLeft,
  right: sankeyRight,
  center: sankeyCenter,
  justify: sankeyJustify,
};

type InputNode = {
  readonly name: string;
};

type InputLink = {
  readonly source: number;
  readonly target: number;
  readonly value: number;
};

type OutPutNode = {
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

type OutPutLink = {
  readonly source: OutPutNode;
  readonly target: OutPutNode;
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

type SankeyLayoutOutPutData = {
  readonly nodes: OutPutNode[];
  readonly links: OutPutLink[];
};

/**
 * 对齐方式的类型定义
 */
export type NodeAlign = keyof typeof ALIGN_METHOD;

/**
 * 布局参数的定义
 */
export type SankeyLayoutOptions = {
  readonly nodeId?: (node: Datum) => any;
  readonly value?: (node: Datum) => any;
  readonly source?: (edge: Datum) => any;
  readonly target?: (edge: Datum) => any;
  // sankey.nodeSort(undefined) is the default and resorts by ascending breadth during each iteration.
  // sankey.nodeSort(null) specifies the input order of nodes and never sorts.
  // sankey.nodeSort(function) specifies the given order as a comparator function and sorts once on initialization.
  readonly sort?: (a: Datum, b: Datum) => number;
  readonly nodeAlign?: NodeAlign;
  readonly nodeWidth?: number;
  readonly nodePadding?: number;
};

/**
 * 默认值
 */
const DEFAULT_OPTIONS: Partial<SankeyLayoutOptions> = {
  nodeId: (node: Datum) => node.index,
  value: (node: Datum) => node.value,
  source: (edge: Datum) => edge.source,
  target: (edge: Datum) => edge.target,
  nodeAlign: 'justify',
  nodeWidth: 0.008,
  nodePadding: 0.03,
  sort: undefined,
};

/**
 * 获得 align function
 * @param nodeAlign
 */
export function getNodeAlignFunction(nodeAlign: NodeAlign) {
  const func = isString(nodeAlign) ? ALIGN_METHOD[nodeAlign] : isFunction(nodeAlign) ? nodeAlign : null;

  return func || sankeyJustify;
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
): SankeyLayoutOutPutData {
  const options = getDefaultOptions(sankeyLayoutOptions);

  const { nodeId, sort, nodeAlign, nodeWidth, nodePadding } = options;

  const sankeyProcessor = sankey()
    .nodeId(nodeId)
    .nodeSort(sort)
    .links((d: any) => d.links)
    .nodeWidth(nodeWidth)
    .nodePadding(nodePadding)
    .nodeAlign(getNodeAlignFunction(nodeAlign))
    .extent([
      [0, 0],
      [1, 1],
    ]);

  // 进行桑基图布局处理
  const layoutData: SankeyLayoutOutPutData = sankeyProcessor(data);

  // post process (x, y), etc.
  layoutData.nodes.forEach((node) => {
    const { x0, x1, y0, y1 } = node;
    /* points
     * 3---2
     * |   |
     * 0---1
     */
    node.x = [x0, x1, x1, x0];
    node.y = [y0, y0, y1, y1];
  });

  layoutData.links.forEach((edge) => {
    const { source, target } = edge;
    const sx = source.x1;
    const tx = target.x0;
    edge.x = [sx, sx, tx, tx];
    const offset = edge.width / 2;
    edge.y = [edge.y0 + offset, edge.y0 - offset, edge.y1 + offset, edge.y1 - offset];
  });

  return layoutData;
}
