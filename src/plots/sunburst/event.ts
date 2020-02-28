import * as _ from '@antv/util';
import { EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const SHAPE_EVENT_MAP: IEventmap = {
  onSunburstClick: 'polygon:click',
  onSunburstDblclick: 'polygon:dblclick',
  onSunburstMousemove: 'polygon:mousemove',
  onSunburstMouseenter: 'polygon:mouseenter',
  onSunburstMouseleave: 'polygon:mouseleave',
  onSunburstMousedown: 'polygon:mousedown',
  onSunburstMouseup: 'polygon:mouseup',
  onSunburstContextmenu: 'polygon:contextmenu',
};

_.assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };
