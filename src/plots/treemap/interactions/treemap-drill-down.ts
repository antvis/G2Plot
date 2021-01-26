import { registerInteraction, registerAction } from '@antv/g2';
import { TreemapDrillDownAction } from './actions/treemap-drill-down-action';
import { isTopParentNode, hasHistoryDrill } from './util';

registerAction('treemap-drill-down-action', TreemapDrillDownAction);

registerInteraction('treemap-drill-down', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:pointer' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
  ],
  start: [
    {
      trigger: 'element:click',
      isEnable: isTopParentNode,
      action: ['treemap-drill-down-action:click', 'reset-button:show'],
    },
  ],
  rollback: [
    { trigger: 'reset-button:click', action: ['treemap-drill-down-action:reset'] },
    {
      trigger: 'reset-button:click',
      action: ['reset-button:hide'],
      isEnable: (context) => !hasHistoryDrill(context),
    },
  ],
});
