import { registerAction, registerInteraction, VIEW_LIFE_CIRCLE } from '../../dependents';
import { SelectedTooltipAction } from './selected-tooltip';

registerAction('selected-tooltip', SelectedTooltipAction);
registerInteraction('selected-tooltip', {
  start: [
    { trigger: VIEW_LIFE_CIRCLE.AFTER_PAINT, action: 'selected-tooltip:show' },
    { trigger: VIEW_LIFE_CIRCLE.AFTER_RENDER, action: 'selected-tooltip:show' },
    {
      trigger: 'plot:mousemove',
      action: 'selected-tooltip:show',
      throttle: { wait: 50, leading: true, trailing: false },
    },
    {
      trigger: 'plot:touchmove',
      action: 'selected-tooltip:show',
      throttle: { wait: 50, leading: true, trailing: false },
    },
  ],
});
