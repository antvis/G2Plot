import ViewLayer from '../base/view-layer';
import { LooseMap } from '../interface/types';
import { each } from '@antv/util';

type IEventmap = LooseMap<string>;

type Handler = (...__: any[]) => {};

const viewComponentMap = {
  View: 'view',
  Axis: 'axis-label',
  Label: 'label',
  Legend: 'legend-item',
};

const canvasComponentMap = {
  Plot: 'plot',
  Title: 'title',
  Description: 'description',
  Breadcrumb: 'breadcrumb',
};

const layerComponentMap = {
  Layer: 'layer',
};

const EVENT_MAP: IEventmap = getEventMap(viewComponentMap);

const CANVAS_EVENT_MAP: IEventmap = getEventMap(canvasComponentMap);

const LAYER_EVENT_MAP: IEventmap = getEventMap(layerComponentMap);

function onEvent(layer: ViewLayer, eventName: string, handler: Handler) {
  layer.view.on(eventName, handler);
}

const eventNames = [
  'Click',
  'Dblclick',
  'Mousemove',
  'Mouseenter',
  'Mouseleave',
  'Mousedown',
  'Mouseup',
  'Contextmenu',
];

const mobileEventNames = [
  'Touchstart',
  'Touch',
  'Touchend',
  'Pressstart',
  'Press',
  'Pressend',
  'Swipestart',
  'Swipe',
  'Swipeend',
  'Pinchstart',
  'Pinch',
  'Pinchend',
  'Panstart',
  'Pan',
  'Panend',
];

export function getEventMap(map) {
  const eventMap: IEventmap = {};
  each(map, (item, key) => {
    const namePrefix = `on${key}`;
    const eventPrefix = `${item}:`;
    each(eventNames, (name) => {
      const eventKey = `${namePrefix}${name}`;
      const eventName = name.toLowerCase();
      const event = `${eventPrefix}${eventName}`;
      eventMap[eventKey] = event;
    });
  });
  return eventMap;
}

export { IEventmap, EVENT_MAP, CANVAS_EVENT_MAP, LAYER_EVENT_MAP, onEvent };
