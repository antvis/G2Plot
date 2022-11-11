import { Types } from '@antv/g2';
import { HIERARCHY_DATA_TRANSFORM_PARAMS } from '../../interactions/actions/drill-down';
import { deepAssign, pick } from '../../utils';
import { pack } from '../../utils/hierarchy/pack';
import { resolveAllPadding } from '../../utils/padding';
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
    nodeInfo[HIERARCHY_DATA_TRANSFORM_PARAMS] = { hierarchyConfig, rawFields, enableDrillDown };

    result.push(nodeInfo);
  });

  return result;
}

/**
 * 根据传入的 padding 和 现有的 画布大小， 输出针对圆形视图布局需要的 finalPadding 以及 finalSize
 * @param params
 */
export function resolvePaddingForCircle(
  padding: Types.ViewPadding,
  appendPadding: Types.ViewAppendPadding,
  containerSize: { width: number; height: number }
) {
  const tempPadding = resolveAllPadding([padding, appendPadding]);
  const [top, right, bottom, left] = tempPadding; // 没设定，默认是 [0, 0, 0, 0]
  const { width, height } = containerSize;

  // 有了 tempPadding 介入以后，计算出coordinate范围宽高的最小值 minSize = circle-packing的直径
  const wSize = width - (left + right);
  const hSize = height - (top + bottom);
  const minSize = Math.min(wSize, hSize); // circle-packing的直径

  // 得到居中后各方向剩余的 padding
  const restWidthPadding = (wSize - minSize) / 2;
  const restHeightPadding = (hSize - minSize) / 2;

  const finalTop = top + restHeightPadding;
  const finalRight = right + restWidthPadding;
  const finalBottom = bottom + restHeightPadding;
  const finalLeft = left + restWidthPadding;

  const finalPadding = [finalTop, finalRight, finalBottom, finalLeft];
  const finalSize = minSize < 0 ? 0 : minSize; // 防止为负数

  return { finalPadding, finalSize };
}
