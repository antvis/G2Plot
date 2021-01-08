import { treemap } from '../../utils/hierarchy/treemap';
import { TreemapOptions } from './types';

export function transformData(options: TreemapOptions) {
  const { data, colorField } = options;

  const nodes = treemap(data, {
    // @ts-ignore
    type: 'hierarchy.treemap',
    tile: 'treemapResquarify',
    field: 'value',
    as: ['x', 'y'],
  });

  const result = [];
  nodes.forEach((node) => {
    if (!node.children) {
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
    }
  });
  return result;
}
