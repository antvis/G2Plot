import * as _ from '@antv/util';
import { EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const SHAPE_EVENT_MAP: IEventmap = {
  onBarClick: 'interval:click',
  onBarDblclick: 'interval:dblclick',
  onBarMousemove: 'interval:mousemove',
  onBarMouseenter: 'interval:mouseenter',
  onBarMouseleave: 'interval:mouseleave',
  onBarMousedown: 'interval:mousedown',
  onBarMouseup: 'interval:mouseup',
  onBarContextmenu: 'interval:contextmenu',
};

_.assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };
