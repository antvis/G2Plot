import LineActive from './line-active';
import LineSelect from './line-select';
import { registerAction, registerInteraction, VIEW_LIFE_CIRCLE } from '../../../dependents';
import { SelectedTooltipAction } from './selected-tooltip';
import MarkerActiveAction from './marker-active';

export { LineActive, LineSelect };

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

registerAction('marker-active', MarkerActiveAction);
registerInteraction('marker-active', {
  start: [
    { trigger: VIEW_LIFE_CIRCLE.AFTER_PAINT, action: 'marker-active:show' },
    { trigger: VIEW_LIFE_CIRCLE.AFTER_RENDER, action: 'marker-active:show' },
    {
      trigger: 'plot:mousemove',
      action: 'marker-active:show',
      throttle: { wait: 50, leading: true, trailing: false },
    },
    {
      trigger: 'plot:touchmove',
      action: 'marker-active:show',
      throttle: { wait: 50, leading: true, trailing: false },
    },
    {
      trigger: 'plot:mouseleave',
      action: 'marker-active:hide',
      throttle: { wait: 50, leading: true, trailing: false },
    },
    {
      trigger: 'plot:touchend',
      action: 'marker-active:hide',
      throttle: { wait: 50, leading: true, trailing: false },
    },
  ],
});
