import { SunburstOptions } from './types';
import { partition } from './hierarchy/partition';
import { treemap } from './hierarchy/treemap';

/**
 * sunburst 处理数据
 * @param options
 */
export function transformData(options: SunburstOptions) {
  const { data, type, seriesField, colorField, hierarchyConfig } = options;
  const transform = {
    partition: partition,
    treemap: treemap,
  };
  const nodes = transform[type](data, {
    ...hierarchyConfig,
    // @ts-ignore
    type: `hierarchy.${type}`,
    field: seriesField,
    as: ['x', 'y'],
  });

  const result = [];
  nodes.forEach((node) => {
    if (node.depth === 0) {
      return null;
    }
    const nodeInfo = {
      [seriesField]: node.data?.[seriesField],
      [colorField]: node.data?.[colorField],
      ...node,
    };
    nodeInfo.ext = hierarchyConfig;
    if (!node.data.brand && node.parent) {
      nodeInfo.brand = node.parent.data.brand;
    } else {
      nodeInfo.brand = node.data.brand;
    }

    result.push(nodeInfo);
  });

  return result;
}
