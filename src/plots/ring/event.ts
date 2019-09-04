import * as _ from '@antv/util';
import { EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const SHAPE_EVENT_MAP: IEventmap = {
  onRingClick: 'interval:click',
  onRingDblclick: 'interval:dblclick',
  onRingMousemove: 'interval:mousemove',
  onRingMouseenter: 'interval:mouseenter',
  onRingMouseleave: 'interval:mouseleave',
  onRingMousedown: 'interval:mousedown',
  onRingMouseup: 'interval:mouseup',
  onRingContextmenu: 'interval:contextmenu',
};

_.assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };
