import * as _ from '@antv/util';
import { EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const SHAPE_EVENT_MAP: IEventmap = {
  onRingProgressClick: 'interval:click',
  onRingProgressDblclick: 'interval:dblclick',
  onRingProgressMousemove: 'interval:mousemove',
  onRingProgressMousedown: 'interval:mousedown',
  onRingProgressMouseup: 'interval:mouseup',
  onRingProgressMouseenter: 'interval:mouseenter',
  onRingProgressMouseleave: 'interval:mouseleave',
  onRingProgressContextmenu: 'interval:contextmenu',
};

_.assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };
