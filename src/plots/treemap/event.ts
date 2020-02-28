import { assign } from '@antv/util';
import { getEventMap, EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const componentMap = {
  Rect: 'polygon',
  Breadcrumb: 'breadcrumb',
};

const SHAPE_EVENT_MAP: IEventmap = getEventMap(componentMap);

assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };
