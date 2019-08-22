import * as _ from '@antv/util';
import { EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const SHAPE_EVENT_MAP: IEventmap = {
  onPieClick: 'interval:click',
  onPieDoubleclick: 'interval:dblclick',
  onPieMousemove: 'interval:mousemove',
  onPieContextmenu: 'interval:contextmenu',
};

_.assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };
