import * as _ from '@antv/util';
import { EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const SHAPE_EVENT_MAP: IEventmap = {
  onProgressClick: 'interval:click',
  onProgressDblclick: 'interval:dblclick',
  onProgressMousemove: 'interval:mousemove',
  onProgressMousedown: 'interval:mousedown',
  onProgressMouseup: 'interval:mouseup',
  onProgressMouseenter: 'interval:mouseenter',
  onProgressMouseleave: 'interval:mouseleave',
  onProgressContextmenu: 'interval:contextmenu'
};

_.assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };