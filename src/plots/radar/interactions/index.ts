import { registerAction, registerInteraction } from '@antv/g2';
import { RadarTooltipAction } from './radar-tooltip-action';

registerAction('radar-tooltip', RadarTooltipAction);
registerInteraction('radar-tooltip', {
  start: [{ trigger: 'plot:mousemove', action: 'radar-tooltip:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'radar-tooltip:hide' }],
});
