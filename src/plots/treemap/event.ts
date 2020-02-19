import { assign } from '@antv/util';
import { EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const SHAPE_EVENT_MAP: IEventmap = {
  onRectClick: 'polygon:click',
  onRectDblclick: 'polygon:dblclick',
  onRectMousemove: 'polygon:mousemove',
  onRectMouseenter: 'polygon:mouseenter',
  onRectMouseleave: 'polygon:mouseleave',
  onRectMousedown: 'polygon:mousedown',
  onRectMouseup: 'polygon:mouseup',
  onRectContextmenu: 'polygon:contextmenu',
  test: 'breadcrumb:click',
};

assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };
