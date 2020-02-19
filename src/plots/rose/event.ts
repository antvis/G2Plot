import * as _ from '@antv/util';
import { EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const SHAPE_EVENT_MAP: IEventmap = {
  onRoseMouseenter: 'interval:mouseenter',
  onRoseMouseleave: 'interval:mouseleave',
};

_.assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };
