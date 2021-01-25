import { get, isArray } from '@antv/util';
import { treemap } from '../../utils/hierarchy/treemap';

import { TreemapOptions } from './types';

export function isDrillDown(interactions: TreemapOptions['interactions']) {
  if (!isArray(interactions)) return false;
  return interactions.findIndex((i) => i.type === 'treemap-drill-down') > -1;
}

interface TransformDataOptions {
  data: TreemapOptions['data'];
  colorField: TreemapOptions['colorField'];
  openDrillDown: boolean;
}

export function transformData(options: TransformDataOptions) {
  const { data, colorField, openDrillDown } = options;

  const nodes = treemap(data, {
    // @ts-ignore
    type: 'hierarchy.treemap',
    tile: 'treemapResquarify',
    field: 'value',
    as: ['x', 'y'],
  });

  const result = [];
  nodes.forEach((node) => {
    if (node.depth === 0) {
      return null;
    }

    // 开启下钻，仅加载 depth === 1 的数据
    if (openDrillDown && node.depth !== 1) {
      return null;
    }

    // 不开启下钻，加载所有叶子节点
    if (!openDrillDown && node.children) {
      return null;
    }

    const eachNode = Object.assign({}, node.data, {
      x: node.x,
      y: node.y,
      depth: node.depth,
      value: node.value,
    });
    if (!node.data[colorField] && node.parent) {
      const ancestorNode = node.ancestors().find((n) => n.data[colorField]);
      eachNode[colorField] = ancestorNode?.data[colorField];
    } else {
      eachNode[colorField] = node.data[colorField];
    }

    result.push(eachNode);
  });
  return result;
}
