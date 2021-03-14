import { get, isArray } from '@antv/util';

/**
 * 判断是否为父节点
 */
export function isTopParentNode(context) {
  const data = get(context, ['event', 'data', 'data'], {});
  return isArray(data.children) && data.children.length > 0 && data.depth === 1;
}
