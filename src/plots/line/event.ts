import * as _ from '@antv/util';
import { EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const SHAPE_EVENT_MAP: IEventmap = {
  onLineClick: 'line:click',
  onLineDoubleclick: 'line:dblclick',
  onLineMousemove: 'line:mousemove',
  onLineMouseenter: 'line:mouseenter',
  onLineMouseleave: 'line:mouseleave',
  onLineMousedown: 'line:mousedown',
  onLineMouseup: 'line:mouseup',
  onLineContextmenu: 'line:contextmenu',
  onPointClick: 'point:click',
  onPointDblclick: 'point:dblclick',
  onPointMousemove: 'point:mousemove',
  onPointMouseenter: 'point:mouseenter',
  onPointMouseleave: 'point:mouseleave',
  onPointMousedown: 'point:mousedown',
  onPointMouseup: 'point:mouseup',
  onPointContextmenu: 'point:contextmenu',
};

_.assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };
