import { registerAction, registerInteraction } from '@antv/g2';
import { SankeyNodeDragAction } from './actions/node-drag';

registerAction('sankey-node-drag', SankeyNodeDragAction);

registerInteraction('sankey-node-draggable', {
  showEnable: [
    { trigger: 'polygon:mouseenter', action: 'cursor:pointer' },
    { trigger: 'polygon:mouseleave', action: 'cursor:default' },
  ],
  start: [{ trigger: 'polygon:mousedown', action: 'sankey-node-drag:start' }],
  processing: [
    { trigger: 'plot:mousemove', action: 'sankey-node-drag:translate' },
    { isEnable: (context) => context.isDragging, trigger: 'plot:mousemove', action: 'cursor:move' },
  ],
  end: [{ trigger: 'plot:mouseup', action: 'sankey-node-drag:end' }],
});
