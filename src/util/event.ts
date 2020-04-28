import ViewLayer from '../base/view-layer';
import { LooseMap } from '../interface/types';
import { each, deepMix, upperFirst } from '@antv/util';

type IEventmap = LooseMap<string>;

type Handler = (...__: any[]) => {};

const eventNames = [
  'click',
  'dblclick',
  'mousemove',
  'mouseenter',
  'mouseleave',
  'mousedown',
  'mouseup',
  'contextmenu',
];

const mobileEventNames = [
  /*'touchstart',
  'touchmove',
  'touchend',
  'pressstart',
  'press',
  'pressend',
  'swipestart',
  'swipe',
  'swipeend',
  'pinchstart',
  'pinch',
  'pinchend',
  'panstart',
  'pan',
  'panend',*/
];

const viewComponentMap = {
  axis: 'axis-label',
  label: 'label',
  legend: 'legend-item',
};

const canvasComponentMap = {
  title: 'title',
  description: 'description',
  breadcrumb: 'breadcrumb',
};

const CANVAS_EVENT_MAP: IEventmap = deepMix(getEventMap(canvasComponentMap), getRegionEventMap('Plot', eventNames));

const LAYER_EVENT_MAP: IEventmap = getRegionEventMap('Layer', eventNames);

//移动端事件暂时只支持view级
const EVENT_MAP: IEventmap = deepMix(
  {},
  getEventMap(viewComponentMap),
  getRegionEventMap('View', eventNames),
  getMobileEventMap()
);

function onEvent(layer: ViewLayer, eventName: string, handler: Handler) {
  layer.view.on(eventName, (ev?: any) => {
    const eventData = {
      x: ev?.x,
      y: ev?.y,
      clientX: ev?.clientX,
      clientY: ev?.clientY,
      target: ev?.target,
      data: ev?.data ? ev.data.data : null,
      plot: layer,
      canvas: layer.canvas,
      gEvent: ev?.gEvent,
    };
    handler(eventData);
  });
}

export function getEventMap(map) {
  const eventMap: IEventmap = {};
  each(map, (item, key) => {
    const componentName = upperFirst(key);
    const namePrefix = `on${componentName}`;
    const eventPrefix = `${item}:`;
    each(eventNames, (name) => {
      const eventName = upperFirst(name);
      const eventKey = `${namePrefix}${eventName}`;
      const event = `${eventPrefix}${name}`;
      eventMap[eventKey] = event;
    });
  });
  return eventMap;
}

export function getRegionEventMap(prefix, eventList) {
  const eventMap: IEventmap = {};
  const namePrefix = `on`;
  each(eventList, (name) => {
    const eventName = upperFirst(name);
    const eventKey = `${namePrefix}${prefix}${eventName}`;
    eventMap[eventKey] = name;
  });
  return eventMap;
}

export function getMobileEventMap() {
  const eventMap: IEventmap = {};
  const namePrefix = `on`;
  each(mobileEventNames, (name) => {
    const eventName = upperFirst(name);
    const eventKey = `${namePrefix}${eventName}`;
    eventMap[eventKey] = name;
  });
  return eventMap;
}

export { IEventmap, EVENT_MAP, CANVAS_EVENT_MAP, LAYER_EVENT_MAP, onEvent };
