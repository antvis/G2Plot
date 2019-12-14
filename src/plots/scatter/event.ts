import * as _ from '@antv/util';
import { EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const SHAPE_EVENT_MAP: IEventmap = {
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
