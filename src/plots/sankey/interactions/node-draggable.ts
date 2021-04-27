import { registerInteraction, registerAction } from '@antv/g2';
import { SankeyNodeDragAction } from './actions/node-drag';

registerAction('sankey-node-drag', SankeyNodeDragAction);

registerInteraction('sankey-node-draggable', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:pointer' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
  ],
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
