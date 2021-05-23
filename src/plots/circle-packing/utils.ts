import { pack } from '../../utils/hierarchy/pack';
import { deepAssign } from '../../utils';
import { CirclePackingOptions } from './types';

interface TransformDataOptions {
  data: CirclePackingOptions['data'];
  hierarchyConfig: CirclePackingOptions['hierarchyConfig'];
}

/**
 * circle-packing 数据转换
 * @param options
 */
export function transformData(options: TransformDataOptions) {
  const { data, hierarchyConfig } = options;

  const nodes = pack(data, {
    ...hierarchyConfig,
    field: 'value',
    as: ['x', 'y', 'r'],
  });

  return nodes.map((node) => {
    const eachNode = deepAssign({}, node.data, {
      hasChildren: !!(node.data.children && node.data.children.length),
      name: node.data.name.split(/(?=[A-Z][^A-Z])/g).join('\n'),
      value: node.value,
      depth: node.depth,
      x: node.x,
      y: node.y,
      r: node.r,
    });

    return eachNode;
  });
}
