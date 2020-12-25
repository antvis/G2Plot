/*
 * for Arc Diagram (edges without weight) / Chord Diagram (edges with source and target weight)
 * graph data required (nodes, edges)
 */
import { assign, forIn, isFunction } from '@antv/util';
import { NodeLinkData } from '../../types/relation-data';

const DEFAULT_OPTIONS: ChordLayoutOptions = {
  y: 0,
  nodeWidthRatio: 0.05, // width of the node, (0, 1)
  weight: false,
  nodePaddingRatio: 0.1, // margin ratio, [0, 1)
  id: (node) => node.id,
  source: (edge) => edge.source,
  target: (edge) => edge.target,
  sourceWeight: (edge) => edge.value || 1,
  targetWeight: (edge) => edge.value || 1,
  sortBy: null, // optional, id | weight | frequency | {function}
};

export type ChordLayoutOptions = {
  weight?: boolean;
  y?: number;
  nodeWidthRatio?: number; // 节点的宽度比例，对应于极坐标系的厚度，(0, 1)
  nodePaddingRatio?: number; // 节点之间的间距的比例，[0, 1)
  id?(node: any): any;
  source?(edge: any): any;
  target?(edge: any): any;
  sourceWeight?(edge: any): number;
  targetWeight?(edge: any): number;
  sortBy?: 'id' | 'weight' | 'frequency' | null | ((a: any, b: any) => number);
};

type OutputNode = {
  readonly id: number;
  readonly name: string;
  // readonly depth: number;
  readonly value: number;

  // 用于绘制 polygon
  x: number[];
  y: number[];
};

type OutputLink = {
  readonly source: OutputNode;
  readonly target: OutputNode;
  readonly value: number;

  // 用于绘制 edge
  x?: number[];
  y?: number[];
};

type ChordLayoutOutputData = {
  readonly nodes: OutputNode[];
  readonly links: OutputLink[];
};
/**
 * 处理节点的value、edges
 * @param nodeById
 * @param edges
 * @param options
 */
function processGraph(nodeById, edges, options) {
  forIn(nodeById, (node, id) => {
    // in edges, out edges
    node.inEdges = edges.filter((edge) => `${options.target(edge)}` === `${id}`);
    node.outEdges = edges.filter((edge) => `${options.source(edge)}` === `${id}`);
    // frequency
    node.edges = node.outEdges.concat(node.inEdges);
    node.frequency = node.edges.length;
    // weight
    node.value = 0;
    node.inEdges.forEach((edge) => {
      node.value += options.targetWeight(edge);
    });
    node.outEdges.forEach((edge) => {
      node.value += options.sourceWeight(edge);
    });
  });
}
/**
 * 节点排序
 * @param nodes
 * @param options
 */
function sortNodes(nodes, options) {
  const sortMethods = {
    weight: (a, b) => b.value - a.value,
    frequency: (a, b) => b.frequency - a.frequency,
    id: (a, b) => `${options.id(a)}`.localeCompare(`${options.id(b)}`),
  };
  let method = sortMethods[options.sortBy];
  if (!method && isFunction(options.sortBy)) {
    method = options.sortBy;
  }
  if (method) {
    nodes.sort(method);
  }
}

function layoutNodes(nodes, options): OutputNode[] {
  const len = nodes.length;
  if (!len) {
    throw new TypeError("Invalid nodes: it's empty!");
  }
  if (options.weight) {
    const nodePaddingRatio = options.nodePaddingRatio;
    if (nodePaddingRatio < 0 || nodePaddingRatio >= 1) {
      throw new TypeError('Invalid nodePaddingRatio: it must be in range [0, 1)!');
    }
    const margin = nodePaddingRatio / (2 * len);
    const nodeWidthRatio = options.nodeWidthRatio;
    if (nodeWidthRatio <= 0 || nodeWidthRatio >= 1) {
      throw new TypeError('Invalid nodeWidthRatio: it must be in range (0, 1)!');
    }
    let totalValue = 0;
    nodes.forEach((node) => {
      totalValue += node.value;
    });
    nodes.forEach((node) => {
      node.weight = node.value / totalValue;
      node.width = node.weight * (1 - nodePaddingRatio);
      node.height = nodeWidthRatio;
    });
    nodes.forEach((node, index) => {
      // x
      let deltaX = 0;
      for (let i = index - 1; i >= 0; i--) {
        deltaX += nodes[i].width + 2 * margin;
      }
      const minX = (node.minX = margin + deltaX);
      const maxX = (node.maxX = node.minX + node.width);
      const minY = (node.minY = options.y - nodeWidthRatio / 2);
      const maxY = (node.maxY = minY + nodeWidthRatio);
      node.x = [minX, maxX, maxX, minX];
      node.y = [minY, minY, maxY, maxY];
      /* points
       * 3---2
       * |   |
       * 0---1
       */
      // node.x = minX + 0.5 * node.width;
      // node.y = options.y;
    });
  } else {
    const deltaX = 1 / len;
    nodes.forEach((node, index) => {
      node.x = (index + 0.5) * deltaX;
      node.y = options.y;
    });
  }
  return nodes;
}

function locatingEdges(nodeById, edges, options): OutputLink[] {
  if (options.weight) {
    const valueById = {};
    forIn(nodeById, (node, id) => {
      valueById[id] = node.value;
    });
    edges.forEach((edge) => {
      const sId = options.source(edge);
      const tId = options.target(edge);
      const sNode = nodeById[sId];
      const tNode = nodeById[tId];
      if (sNode && tNode) {
        const sValue = valueById[sId];
        const currentSValue = options.sourceWeight(edge);
        const sStart = sNode.minX + ((sNode.value - sValue) / sNode.value) * sNode.width;
        const sEnd = sStart + (currentSValue / sNode.value) * sNode.width;
        valueById[sId] -= currentSValue;

        const tValue = valueById[tId];
        const currentTValue = options.targetWeight(edge);
        const tStart = tNode.minX + ((tNode.value - tValue) / tNode.value) * tNode.width;
        const tEnd = tStart + (currentTValue / tNode.value) * tNode.width;
        valueById[tId] -= currentTValue;

        const y = options.y;
        edge.x = [sStart, sEnd, tStart, tEnd];
        edge.y = [y, y, y, y];
        // 将edge的source与target的id换为 sourceNode与targetNode
        edge.source = sNode;
        edge.target = tNode;
      }
    });
  } else {
    edges.forEach((edge) => {
      const sNode = nodeById[options.source(edge)];
      const tNode = nodeById[options.target(edge)];
      if (sNode && tNode) {
        edge.x = [sNode.x, tNode.x];
        edge.y = [sNode.y, tNode.y];
        // 将edge的source与target的id换为 sourceNode与targetNode
        edge.source = sNode;
        edge.target = tNode;
      }
    });
  }
  return edges;
}
export function getDefaultOptions(options: ChordLayoutOptions): ChordLayoutOptions {
  return assign({}, DEFAULT_OPTIONS, options);
}
export function chordLayout(
  chordLayoutOptions: ChordLayoutOptions,
  chordLayoutInputData: NodeLinkData
): ChordLayoutOutputData {
  const options = getDefaultOptions(chordLayoutOptions);
  const nodeById = {};
  const nodes = chordLayoutInputData.nodes;
  const links = chordLayoutInputData.links;
  nodes.forEach((node) => {
    const id = options.id(node);
    nodeById[id] = node;
  });
  processGraph(nodeById, links, options);
  sortNodes(nodes, options);
  const outputNodes = layoutNodes(nodes, options);
  const outputLinks = locatingEdges(nodeById, links, options);
  return {
    nodes: outputNodes,
    links: outputLinks,
  };
}
