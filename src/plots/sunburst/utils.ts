import DataSet from '@antv/data-set';
import { SunburstOptions } from './types';

/**
 * sunburst 处理数据
 * @param options
 */
export function transformData(options: SunburstOptions) {
  const { data, type, seriesField, colorField, hierarchyConfig } = options;
  const { DataView } = DataSet;
  const dv = new DataView();
  dv.source(data, {
    type: 'hierarchy',
  }).transform({
    ...hierarchyConfig,
    // @ts-ignore
    type: `hierarchy.${type}`,
    field: seriesField,
    as: ['x', 'y'],
  });
  const nodes = dv.getAllNodes();
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
    if (!node.data.brand && node.parent) {
      nodeInfo.brand = node.parent.data.brand;
    } else {
      nodeInfo.brand = node.data.brand;
    }

    result.push(nodeInfo);
  });

  return result;
}
