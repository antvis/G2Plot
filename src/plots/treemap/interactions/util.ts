import { get, isArray } from '@antv/util';

/**
 * 判断是否为父节点
 */
export function isTopParentNode(context) {
  const data = get(context, ['event', 'data', 'data'], {});

  return isArray(data.children) && data.children.length > 0 && data.depth === 1;
}

/**
 * 判断是否已无历史下钻
 */
export function noHistoryDrill(context) {
  if (!context || !context.getAction) return;
  const treemapElementDrillAction = context.getAction('treemap-element-drill-action');
  // @ts-ignore
  const { cacheDataStack } = treemapElementDrillAction;

  if (!isArray(cacheDataStack) || cacheDataStack.length <= 0) {
    return true;
  }
  return false;
}
