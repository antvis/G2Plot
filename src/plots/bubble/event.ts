import * as _ from '@antv/util';
import { EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const SHAPE_EVENT_MAP: IEventmap = {
  onBubbleClick: 'point:click',
  onBubbleDblclick: 'point:dblclick',
  onBubbleMousemove: 'point:mousemove',
  onBubbleMouseenter: 'point:mouseenter',
  onBubbleMouseleave: 'point:mouseleave',
  onBubbleMousedown: 'point:mousedown',
  onBubbleMouseup: 'point:mouseup',
  onBubbleContextmenu: 'point:contextmenu',
};

_.assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };
