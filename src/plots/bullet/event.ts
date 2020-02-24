import { assign } from '@antv/util';
import { EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const SHAPE_EVENT_MAP: IEventmap = {
  onBulletClick: 'interval:click',
  onBulletDblclick: 'interval:dblclick',
  onBulletMousemove: 'interval:mousemove',
  onBulletMouseenter: 'interval:mouseenter',
  onBulletMouseleave: 'interval:mouseleave',
  onBulletMousedown: 'interval:mousedown',
  onBulletMouseup: 'interval:mouseup',
  onBulletContextmenu: 'interval:contextmenu',
};

assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };
