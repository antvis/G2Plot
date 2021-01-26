import { get, isArray } from '@antv/util';

/**
 * 判断是否为父节点
 */
export function isTopParentNode(context) {
  const data = get(context, ['event', 'data', 'data'], {});
  return isArray(data.children) && data.children.length > 0 && data.depth === 1;
}

/**
 * 判断是否仍有历史下钻
 */
export function hasHistoryDrill(context) {
  if (!context || !context.getAction) return false;

  const treemapElementDrillAction = context.getAction('treemap-drill-down-action');

  if (!treemapElementDrillAction) return false;

  // @ts-ignore
  const { cacheDataStack } = treemapElementDrillAction;

  return isArray(cacheDataStack) && cacheDataStack.length > 0;
}
