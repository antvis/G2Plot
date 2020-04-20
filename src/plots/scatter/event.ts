import { assign } from '@antv/util';
import { getEventMap, EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const componentMap = {
  point: 'point',
  trendline: 'trendline',
  confidence: 'confidence',
  quadrant: 'quadrant',
  quadrantLabel: 'quadrant-label',
  quadrantLine: 'quadrant-line',
};

const SHAPE_EVENT_MAP: IEventmap = getEventMap(componentMap);

assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };
