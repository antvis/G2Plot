import { registerAction, registerInteraction } from '@antv/g2';
import { MarkerActiveAction } from './marker-active';

registerAction('marker-active', MarkerActiveAction);
registerInteraction('marker-active', {
  start: [
    {
      trigger: 'tooltip:show',
      action: 'marker-active:active',
    },
  ],
});
