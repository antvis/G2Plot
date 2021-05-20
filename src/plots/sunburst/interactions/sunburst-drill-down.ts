import { registerInteraction, registerAction } from '@antv/g2';
import { SunburstDrillDownAction } from './actions/sunburst-drill-down-action';

registerAction('sunburst-drill-down-action', SunburstDrillDownAction);

registerInteraction('sunburst-drill-down', {
  showEnable: [
    { trigger: 'element:mouseenter', action: 'cursor:pointer' },
    { trigger: 'element:mouseleave', action: 'cursor:default' },
  ],
  start: [
    {
      trigger: 'element:click',
      action: ['sunburst-drill-down-action:click'],
    },
    {
      trigger: 'afterchangesize',
      action: ['sunburst-drill-down-action:resetPosition'],
    },
  ],
});
