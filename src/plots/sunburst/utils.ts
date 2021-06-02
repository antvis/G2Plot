import { pick } from '../../utils';
import { partition } from '../../utils/hierarchy/partition';
import { treemap } from '../../utils/hierarchy/treemap';
import { SUNBURST_ANCESTOR_FIELD, SUNBURST_PATH_FIELD, SUNBURST_X_FIELD } from './constant';
import { SunburstOptions } from './types';

function getNodeName(node: any) {
  // note: 兼容旧版本的 label key 值
  return node.data[SUNBURST_X_FIELD] || node.data.label;
}

/**
 * sunburst 处理数据
 * @param options
 */
export function transformData(options: SunburstOptions) {
  const { data, colorField, rawFields, hierarchyConfig } = options;
  const transform = {
    partition: partition,
    treemap: treemap,
  };
  // @ts-ignore 兼容旧版本，支持 seriesField 来作为 hierarchyConfig.field
  const seriesField = options.seriesField;
  // @ts-ignore 兼容旧版本，支持矩阵树图形状的旭日图
  const type = options.type || 'partition';

  const nodes = transform[type](data, {
    field: seriesField || 'value',
    ...hierarchyConfig,
    // @ts-ignore
    type: `hierarchy.${type}`,
    as: ['x', 'y'],
  });

  const result = [];

  nodes.forEach((node) => {
    if (node.depth === 0) {
      return null;
    }

    let path = getNodeName(node);
    let ancestorNode = { ...node };
    while (ancestorNode.depth > 1) {
      path = `${getNodeName(ancestorNode.parent)} / ${path}`;
      ancestorNode = ancestorNode.parent;
    }

    const nodeInfo = {
      ...pick(node.data, [...(rawFields || []), hierarchyConfig.field]),
      [SUNBURST_PATH_FIELD]: path,
      [SUNBURST_X_FIELD]: getNodeName(node),
      // 可以覆盖 colorField
      [SUNBURST_ANCESTOR_FIELD]: getNodeName(ancestorNode),
      ...node,
    };
    // note: 兼容旧版本
    if (seriesField) {
      nodeInfo[seriesField] = node.data[seriesField] || node.parent?.data?.[seriesField];
    }
    if (colorField) {
      nodeInfo[colorField] = node.data[colorField] || node.parent?.data?.[colorField];
    }
    nodeInfo.ext = hierarchyConfig;
    result.push(nodeInfo);
  });

  return result;
}
