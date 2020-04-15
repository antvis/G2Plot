import ViewLayer from '../base/view-layer';
import { LooseMap } from '../interface/types';
import { each, deepMix } from '@antv/util';

type IEventmap = LooseMap<string>;

type Handler = (...__: any[]) => {};

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

const CANVAS_EVENT_MAP: IEventmap = getEventMap(canvasComponentMap);

const LAYER_EVENT_MAP: IEventmap = getEventMap(layerComponentMap);

//移动端事件暂时只支持view级
const EVENT_MAP: IEventmap = deepMix({}, getEventMap(viewComponentMap), getMobileEventMap());

function onEvent(layer: ViewLayer, eventName: string, handler: Handler) {
  layer.view.on(eventName, (ev) => {
    const eventData = {
      x: ev.x,
      y: ev.y,
      clientX: ev.clientX,
      clientY: ev.clientY,
      target: ev.target,
      data: ev.data ? ev.data.data : null,
      plot: layer,
      canvas: layer.canvas,
      gEvent: ev.gEvent,
    };
    handler(eventData);
  });
}

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

export function getMobileEventMap() {
  const eventMap: IEventmap = {};
  const namePrefix = `on`;
  each(mobileEventNames, (name) => {
    const eventKey = `${namePrefix}${name}`;
    const eventName = name.toLowerCase();
    eventMap[eventKey] = eventName;
  });
  return eventMap;
}

export { IEventmap, EVENT_MAP, CANVAS_EVENT_MAP, LAYER_EVENT_MAP, onEvent };
