import { omit } from '@antv/util';
import { HIERARCHY_DATA_TRANSFORM_PARAMS } from '../../interactions/actions/drill-down';
import { pick } from '../../utils';
import { partition } from '../../utils/hierarchy/partition';
import { treemap } from '../../utils/hierarchy/treemap';
import { SUNBURST_ANCESTOR_FIELD, SUNBURST_PATH_FIELD } from './constant';
import { SunburstOptions } from './types';

/**
 * sunburst 处理数据
 * @param options
 */
export function transformData(options: Pick<SunburstOptions, 'data' | 'colorField' | 'rawFields' | 'hierarchyConfig'>) {
  const { data, colorField, rawFields, hierarchyConfig = {} } = options;
  const { activeDepth } = hierarchyConfig;
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
    ...omit(hierarchyConfig, ['activeDepth']),
    // @ts-ignore
    type: `hierarchy.${type}`,
    as: ['x', 'y'],
  });

  const result = [];

  nodes.forEach((node) => {
    if (node.depth === 0) {
      return null;
    }
    if (activeDepth > 0 && node.depth > activeDepth) {
      return null;
    }

    let path = node.data.name;
    let ancestorNode = { ...node };
    while (ancestorNode.depth > 1) {
      path = `${ancestorNode.parent.data?.name} / ${path}`;
      ancestorNode = ancestorNode.parent;
    }

    const nodeInfo = {
      ...pick(node.data, [...(rawFields || []), hierarchyConfig.field]),
      [SUNBURST_PATH_FIELD]: path,
      [SUNBURST_ANCESTOR_FIELD]: ancestorNode.data.name,
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
    nodeInfo[HIERARCHY_DATA_TRANSFORM_PARAMS] = { hierarchyConfig, colorField, rawFields };
    result.push(nodeInfo);
  });

  return result;
}
