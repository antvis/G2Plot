import { assign } from '@antv/util';
import { EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const SHAPE_EVENT_MAP: IEventmap = {
  onPieClick: 'interval:click',
  onPieDblclick: 'interval:dblclick',
  onPieMousemove: 'interval:mousemove',
  onPieMouseenter: 'interval:mouseenter',
  onPieMouseleave: 'interval:mouseleave',
  onPieMousedown: 'interval:mousedown',
  onPieMouseup: 'interval:mouseup',
  onPieContextmenu: 'interval:contextmenu',
};

assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };
