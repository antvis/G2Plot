import { isArray, get } from '@antv/util';
import { View } from '@antv/g2';
import { HIERARCHY_DATA_TRANSFORM_PARAMS } from '../../interactions/actions/drill-down';
import { Interaction } from '../../types/interaction';
import { treemap } from '../../utils/hierarchy/treemap';
import { TreemapOptions } from './types';

export function findInteraction(
  interactions: TreemapOptions['interactions'],
  interactionType: string
): undefined | Interaction {
  if (!isArray(interactions)) return undefined;
  return interactions.find((i) => i.type === interactionType);
}

export function enableInteraction(interactions: TreemapOptions['interactions'], interactionType: string): boolean {
  const interaction = findInteraction(interactions, interactionType);
  return interaction && interaction.enable !== false;
}

/**
 * 是否允许下钻交互
 * @param interactions
 * @param interactionType
 * @returns
 */
export function enableDrillInteraction(options: TreemapOptions): boolean {
  const { interactions, drilldown } = options;
  // 兼容旧版本, treemap-drill-down
  return get(drilldown, 'enabled') || enableInteraction(interactions, 'treemap-drill-down');
}

export function resetDrillDown(chart: View) {
  const drillDownInteraction = chart.interactions['drill-down'];

  if (!drillDownInteraction) return;

  // @ts-ignore
  const drillDownAction = drillDownInteraction.context.actions.find((i) => i.name === 'drill-down-action');

  drillDownAction.reset();
}

interface TransformDataOptions {
  data: TreemapOptions['data'];
  colorField: TreemapOptions['colorField'];
  enableDrillDown: boolean;
  hierarchyConfig: TreemapOptions['hierarchyConfig'];
}

export function transformData(options: TransformDataOptions) {
  const { data, colorField, enableDrillDown, hierarchyConfig } = options;

  const nodes = treemap(data, {
    ...hierarchyConfig,
    // @ts-ignore
    type: 'hierarchy.treemap',
    field: 'value',
    as: ['x', 'y'],
  });

  const result = [];
  nodes.forEach((node) => {
    if (node.depth === 0) {
      return null;
    }

    // 开启下钻，仅加载 depth === 1 的数据
    if (enableDrillDown && node.depth !== 1) {
      return null;
    }

    // 不开启下钻，加载所有叶子节点
    if (!enableDrillDown && node.children) {
      return null;
    }

    // path 信息仅挑选必要祖先元素属性，因为在有些属性是不必要(x, y), 或是不准确的(下钻时的 depth)，不对外透出
    const curPath = node.ancestors().map((n) => ({
      data: n.data,
      height: n.height,
      value: n.value,
    }));
    // 在下钻树图中，每次绘制的是当前层级信息，将父元素的层级信息（data.path) 做一层拼接。
    const path = enableDrillDown && isArray(data.path) ? curPath.concat(data.path.slice(1)) : curPath;

    const nodeInfo = Object.assign({}, node.data, {
      x: node.x,
      y: node.y,
      depth: node.depth,
      value: node.value,
      path,
      ...node,
    });
    if (!node.data[colorField] && node.parent) {
      const ancestorNode = node.ancestors().find((n) => n.data[colorField]);
      nodeInfo[colorField] = ancestorNode?.data[colorField];
    } else {
      nodeInfo[colorField] = node.data[colorField];
    }

    nodeInfo[HIERARCHY_DATA_TRANSFORM_PARAMS] = { hierarchyConfig, colorField, enableDrillDown };
    result.push(nodeInfo);
  });
  return result;
}
