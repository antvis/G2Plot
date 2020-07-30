import { registerInteraction } from '@antv/g2';

registerInteraction('drag-move', {
  start: [{ trigger: 'plot:mousedown', action: 'scale-translate:start' }],
  processing: [
    {
      trigger: 'plot:mousemove',
      action: 'scale-translate:translate',
      throttle: { wait: 100, leading: true, trailing: false },
    },
  ],
  end: [{ trigger: 'plot:mouseup', action: 'scale-translate:end' }],
});
