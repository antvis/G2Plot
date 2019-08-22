import * as _ from '@antv/util';
import { EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const SHAPE_EVENT_MAP: IEventmap = {
  onLineClick: 'line:click',
  onLineDoubleclick: 'line:dblclick',
  onLineMousemove: 'line:mousemove',
  onLineContextmenu: 'line:contextmenu',
  onPointClick: 'point:click',
  onPointDoubleclick: 'point:dblclick',
  onPointMousemove: 'point:mousemove',
  onPointContextmenu: 'point:contextmenu',
};

_.assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };
