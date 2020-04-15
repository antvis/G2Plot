import { assign } from '@antv/util';
import { EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const SHAPE_EVENT_MAP: IEventmap = {
  onFunnelClick: 'interval:click',
  onFunnelDblclick: 'interval:dblclick',
  onFunnelMousemove: 'interval:mousemove',
  onFunnelMouseenter: 'interval:mouseenter',
  onFunnelMouseleave: 'interval:mouseleave',
  onFunnelMousedown: 'interval:mousedown',
  onFunnelMouseup: 'interval:mouseup',
  onFunnelContextmenu: 'interval:contextmenu',
};

assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };
