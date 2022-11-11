import { registerAction, registerInteraction } from '@antv/g2';
import { get, isArray } from '@antv/util';
import { DrillDownAction } from './actions/drill-down';

/**
 * 判断是否为父节点
 */
export function isParentNode(context) {
  const data = get(context, ['event', 'data', 'data'], {});
  return isArray(data.children) && data.children.length > 0;
}

/**
 * 判断是否在中心
 */
function inCenter(context) {
  const coordinate = context.view.getCoordinate();
  const { innerRadius } = coordinate;
  if (innerRadius) {
    const { x, y } = context.event;
    const { x: centerX, y: centerY } = coordinate.center;
    const r = coordinate.getRadius() * innerRadius;
    const distance = Math.sqrt((centerX - x) ** 2 + (centerY - y) ** 2);
    return distance < r;
  }
  return false;
}

registerAction('drill-down-action', DrillDownAction);
registerInteraction('drill-down', {
  showEnable: [
    { trigger: 'element:mouseenter', action: 'cursor:pointer', isEnable: isParentNode },
    { trigger: 'element:mouseleave', action: 'cursor:default' },
    // 中心处，肯定会触发 element:mouseleave 操作
    { trigger: 'element:mouseleave', action: 'cursor:pointer', isEnable: inCenter },
  ],
  start: [
    {
      trigger: 'element:click',
      isEnable: isParentNode,
      action: ['drill-down-action:click'],
    },
    {
      trigger: 'afterchangesize',
      action: ['drill-down-action:resetPosition'],
    },
    {
      // 点击中心，返回上一层
      trigger: 'click',
      isEnable: inCenter,
      action: ['drill-down-action:back'],
    },
  ],
});
