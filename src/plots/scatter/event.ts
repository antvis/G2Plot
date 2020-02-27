import { assign } from '@antv/util';
import { getEventMap, EVENT_MAP, IEventmap, onEvent } from '../../util/event';

const componentMap = {
  Point:'point',
  Trendline:'trendline',
  Confidence:'confidence',
  Quadrant:'quadrant',
  QuadrantLabel:'quadrant-label',
  QuadrantLine:'quadrant-line'
};

const SHAPE_EVENT_MAP: IEventmap = getEventMap(componentMap);

assign(EVENT_MAP, SHAPE_EVENT_MAP);

export { EVENT_MAP, onEvent };
