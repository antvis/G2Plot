import * as _ from '@antv/util';
import { EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const SHAPE_EVENT_MAP: IEventmap = {
  onColumnClick: 'interval:click',
  onColumnDblclick: 'interval:dblclick',
  onColumnMousemove: 'interval:mousemove',
  onColumnMouseenter: 'interval:mouseenter',
  onColumnMouseleave: 'interval:mouseleave',
  onColumnMousedown: 'interval:mousedown',
  onColumnMouseup: 'interval:mouseup',
  onColumnContextmenu: 'interval:contextmenu',
};

_.assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };
