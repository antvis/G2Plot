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
      const eachNode: any = {
        name: node.data.name,
        x: node.x,
        y: node.y,
        depth: node.depth,
        value: node.value,
      };
      if (!node.data[colorField] && node.parent) {
        eachNode[colorField] = node.parent.data[colorField];
      } else {
        eachNode[colorField] = node.data[colorField];
      }

      result.push(eachNode);
    }
  });
  return result;
}
