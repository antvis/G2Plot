import { registerInteraction, registerAction } from '@antv/g2';
import { get, isArray } from '@antv/util';
import { DrillDownAction } from './actions/drill-down';

/**
 * 判断是否为父节点
 */
export function isParentNode(context) {
  const data = get(context, ['event', 'data', 'data'], {});
  return isArray(data.children) && data.children.length > 0;
}

registerAction('drill-down-action', DrillDownAction);

registerInteraction('drill-down', {
  showEnable: [
    { trigger: 'element:mouseenter', action: 'cursor:pointer', isEnable: isParentNode },
    { trigger: 'element:mouseleave', action: 'cursor:default' },
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
  ],
});
