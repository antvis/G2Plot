/*
 * for Arc Diagram (edges without weight) / Chord Diagram (edges with source and target weight)
 * graph data required (nodes, edges)
 */
import { assign, forIn, isArray, values, isFunction } from '@antv/util';
// import { DataSet } from '../../data-set';
// import { View } from '../../view';

const DEFAULT_OPTIONS: ChordLayoutOptions = {
  y: 0,
  thickness: 0.05, // thickness of the node, (0, 1)
  weight: false,
  marginRatio: 0.1, // margin ratio, [0, 1)
  id: (node) => node.id,
  source: (edge) => edge.source,
  target: (edge) => edge.target,
  sourceWeight: (edge) => edge.sourceWeight || 1,
  targetWeight: (edge) => edge.targetWeight || 1,
  sortBy: null, // optional, id | weight | frequency | {function}
};

export type ChordLayoutOptions = {
  y?: number;
  thickness?: number;
  weight?: boolean;
  marginRatio?: number;
  id?(node: any): any;
  source?(edge: any): any;
  target?(edge: any): any;
  sourceWeight?(edge: any): number;
  targetWeight?(edge: any): number;
  sortBy?: 'id' | 'weigth' | 'frequency' | null | ((a: any, b: any) => number);
};

type InputNode = {
  readonly id: string;
  readonly value: number;
  readonly name: string;
};

type InputLink = {
  readonly source: number;
  readonly target: number;
  readonly sourceWeight: number;
  readonly targetWeight: number;
};

type OutputNode = {
  readonly name: string;
  readonly x0: number;
  readonly x1: number;
  readonly y0: number;
  readonly y1: number;
  readonly id: string;
  // readonly depth: number;
  readonly value: number;

  // 用于绘制 polygon
  x: number[];
  y: number[];
};

type OutputLink = {
  readonly source: OutputNode;
  readonly target: OutputNode;
  readonly sourceName: string;
  readonly targetName: string;
  readonly sourceWeight: number;
  readonly targetWeight: number;
  readonly y0: number;
  readonly y1: number;

  // 用于绘制 edge
  x?: number[];
  y?: number[];
};
export type ChordLayoutInputData = {
  readonly nodes: InputNode[];
  readonly links: InputLink[];
};

type ChordLayoutOutputData = {
  readonly nodes: OutputNode[];
  readonly links: OutputLink[];
};

function _nodesFromEdges(edges, options, map = {}) {
  edges.forEach((edge) => {
    const sId = options.edgeSource(edge);
    const tId = options.edgeTarget(edge);
    if (!map[sId]) {
      map[sId] = {
        id: sId,
      };
    }
    if (!map[tId]) {
      map[tId] = {
        id: tId,
      };
    }
  });
  return values(map);
}

function _processGraph(nodeById, edges, options) {
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

function _sortNodes(nodes, options) {
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

function _layoutNodes(nodes, options): OutputNode[] {
  const len = nodes.length;
  if (!len) {
    throw new TypeError("Invalid nodes: it's empty!");
  }
  if (options.weight) {
    const marginRatio = options.marginRatio;
    if (marginRatio < 0 || marginRatio >= 1) {
      throw new TypeError('Invalid marginRatio: it must be in range [0, 1)!');
    }
    const margin = marginRatio / (2 * len);
    const thickness = options.thickness;
    if (thickness <= 0 || thickness >= 1) {
      throw new TypeError('Invalid thickness: it must be in range (0, 1)!');
    }
    let totalValue = 0;
    nodes.forEach((node) => {
      totalValue += node.value;
    });
    nodes.forEach((node) => {
      node.weight = node.value / totalValue;
      node.width = node.weight * (1 - marginRatio);
      node.height = thickness;
    });
    nodes.forEach((node, index) => {
      // x
      let deltaX = 0;
      for (let i = index - 1; i >= 0; i--) {
        deltaX += nodes[i].width + 2 * margin;
      }
      const minX = (node.minX = margin + deltaX);
      const maxX = (node.maxX = node.minX + node.width);
      const minY = (node.minY = options.y - thickness / 2);
      const maxY = (node.maxY = minY + thickness);
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

function _locatingEdges(nodeById, edges, options): OutputLink[] {
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
      }
    });
  } else {
    edges.forEach((edge) => {
      const sNode = nodeById[options.source(edge)];
      const tNode = nodeById[options.target(edge)];
      if (sNode && tNode) {
        edge.x = [sNode.x, tNode.x];
        edge.y = [sNode.y, tNode.y];
      }
    });
  }
  return edges;
}

export function chordLayout(
  chordLayoutOptions: ChordLayoutOptions,
  chordLayoutInputData: ChordLayoutInputData
): ChordLayoutOutputData {
  const options = assign({}, DEFAULT_OPTIONS, chordLayoutOptions);
  const nodeById = {};
  let nodes = chordLayoutInputData.nodes;
  const links = chordLayoutInputData.links;
  if (!isArray(nodes) || nodes.length === 0) {
    nodes = _nodesFromEdges(links, options, nodeById);
  }
  nodes.forEach((node) => {
    const id = options.id(node);
    nodeById[id] = node;
  });
  _processGraph(nodeById, links, options);
  _sortNodes(nodes, options);
  const outputNodes = _layoutNodes(nodes, options);
  const outputLinks = _locatingEdges(nodeById, links, options);
  return {
    nodes: outputNodes,
    links: outputLinks,
  };
}
