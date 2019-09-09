import * as _ from '@antv/util';
import { EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const SHAPE_EVENT_MAP: IEventmap = {
  onLineClick: 'line:click',
  onLineDblclick: 'line:dblclick',
  onLineMousemove: 'line:mousemove',
  onLineMousedown: 'line:mousedown',
  onLineMouseup: 'line:mouseup',
  onLineMouseenter: 'line:mouseenter',
  onLineMouseleave: 'line:mouseleave',
  onLineContextmenu: 'line:contextmenu'
};

_.assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };