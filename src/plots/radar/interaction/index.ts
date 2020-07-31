import { registerAction, registerInteraction } from '@antv/g2';
import { RadarTooltipAction } from './radar-tooltip-action';

registerAction('radar-tooltip', RadarTooltipAction);
registerInteraction('radar-tooltip', {
  start: [{ trigger: 'element:mouseenter', action: 'radar-tooltip:show' }],
  end: [{ trigger: 'element:mouseleave', action: 'radar-tooltip:hide' }],
});
