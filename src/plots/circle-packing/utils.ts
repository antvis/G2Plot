import { pack } from '../../utils/hierarchy/pack';
import { deepAssign, pick } from '../../utils';
import { HIERARCHY_DATA_TRANSFORM_PARAMS } from '../../interactions/actions/drill-down';
import { CirclePackingOptions } from './types';

interface TransformDataOptions {
  data: CirclePackingOptions['data'];
  rawFields: CirclePackingOptions['rawFields'];
  enableDrillDown: boolean;
  hierarchyConfig: CirclePackingOptions['hierarchyConfig'];
}

/**
 * circle-packing 数据转换
 * @param options
 */
export function transformData(options: TransformDataOptions) {
  const { data, hierarchyConfig, rawFields = [], enableDrillDown } = options;

  const nodes = pack(data, {
    ...hierarchyConfig,
    field: 'value',
    as: ['x', 'y', 'r'],
  });

  const result = [];
  nodes.forEach((node) => {
    let path = node.data.name;
    let ancestorNode = { ...node };
    while (ancestorNode.depth > 1) {
      path = `${ancestorNode.parent.data?.name} / ${path}`;
      ancestorNode = ancestorNode.parent;
    }

    console.log('node', node);

    // 开启下钻，仅加载 depth <= 2 的数据 (加载两层)
    if (enableDrillDown && node.depth > 2) {
      return null;
    }

    const nodeInfo = deepAssign({}, node.data, {
      ...pick(node.data, rawFields),
      path,
      // 以下字段，必备: x, y, r, name, depth, height
      ...node,
    });

    nodeInfo.ext = hierarchyConfig;
    nodeInfo[HIERARCHY_DATA_TRANSFORM_PARAMS] = { hierarchyConfig, rawFields };

    result.push(nodeInfo);
  });

  return result;
}
