import { registerAction, registerInteraction } from '@antv/g2';
import { PieLegendAction } from './actions/legend-active';
import { StatisticAction } from './actions/statistic-active';

export const PIE_STATISTIC = 'pie-statistic';

registerAction(PIE_STATISTIC, StatisticAction);
registerInteraction('pie-statistic-active', {
  start: [{ trigger: 'element:mouseenter', action: 'pie-statistic:change' }],
  end: [{ trigger: 'element:mouseleave', action: 'pie-statistic:reset' }],
});

registerAction('pie-legend', PieLegendAction);
registerInteraction('pie-legend-active', {
  start: [{ trigger: 'legend-item:mouseenter', action: 'pie-legend:active' }],
  end: [{ trigger: 'legend-item:mouseleave', action: 'pie-legend:reset' }],
});
