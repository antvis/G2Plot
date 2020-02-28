import ViewLayer from '../base/view-layer';
import { LooseMap } from '../interface/types';
import { each } from '@antv/util';

type IEventmap = LooseMap<string>;

const EVENT_MAP: IEventmap = {
  onViewClick: 'click',
  onViewDblClick: 'dblclick',
  onViewMousemove: 'mousemove',
  onViewMousedown: 'mousedown',
  onViewMouseup: 'mouseup',
  onViewMouseenter: 'mouseenter',
  onViewMouseleave: 'mouseleave',
  onViewContextmenu: 'contextmenu',
  onAxisClick: 'axis-label:click',
  onAxisDblClick: 'axis-label:dblclick',
  onAxisMousemove: 'axis-label:mousemove',
  onAxisMousedown: 'axis-label:mousedown',
  onAxisMouseup: 'axis-label:mouseup',
  onAxisMouseenter: 'axis-label:mouseenter',
  onAxisMouseleave: 'axis-label:mouseleave',
  onAxisContextmenu: 'axis-label:contextmenu',
  onLabelClick: 'label:click',
  onLabelDblClick: 'label:dblclick',
  onLabelMousemove: 'label:mousemove',
  onLabelMouseup: 'label:mouseup',
  onLabelMousedown: 'label:mousedown',
  onLabelMouseenter: 'label:mouseenter',
  onLabelMouseleave: 'label:mouseleave',
  onLabelContextmenu: 'label:contextmenu',
  onLegendClick: 'legend-item:click',
  onLegendDblClick: 'legend-item:dblclick',
  onLegendMouseMove: 'legend-item:mousemove',
  onLegendMouseDown: 'legend-item:mousedown',
  onLegendMouseUp: 'legend-item:mouseup',
  onLegendMouseLeave: 'legend-item:mouseleave',
  onLegendMouseEnter: 'legend-item:mouseenter',
  onLegendContextmenu: 'legend-item:contextmenu',
};

const CANVAS_EVENT_MAP = {
  onPlotClick: 'click',
  onPlotDblClick: 'dblclick',
  onPlotMousemove: 'mousemove',
  onPlotMousedown: 'mousedown',
  onPlotMouseup: 'mouseup',
  onPlotMouseenter: 'mouseenter',
  onPlotMouseleave: 'mouseleave',
  onPlotContextmenu: 'contextmenu',

  onTitleClick: 'title:click',
  onTitleDblClick: 'title:dblclick',
  onTitleMousemove: 'title:mousemove',
  onTitleMousedown: 'title:mousedown',
  onTitleMouseup: 'title:mouseup',
  onTitleMouseenter: 'title:mouseenter',
  onTitleMouseleave: 'title:mouseleave',
  onTitleContextmenu: 'title:contextmenu',

  onDescriptionClick: 'description:click',
  onDescriptionDblClick: 'description:dblclick',
  onDescriptionMousemove: 'description:mousemove',
  onDescriptionMousedown: 'description:mousedown',
  onDescriptionMouseup: 'description:mouseup',
  onDescriptionMouseenter: 'description:mouseenter',
  onDescriptionMouseleave: 'description:mouseleave',
  onDescriptionContextmenu: 'description:contextmenu',

  onBreadcrumbClick: 'breadcrumb:click',
  onBreadcrumbDblClick: 'breadcrumb:dblclick',
  onBreadcrumbMousemove: 'breadcrumb:mousemove',
  onBreadcrumbMousedown: 'breadcrumb:mousedown',
  onBreadcrumbMouseup: 'breadcrumb:mouseup',
  onBreadcrumbMouseenter: 'breadcrumb:mouseenter',
  onBreadcrumbMouseleave: 'breadcrumb:mouseleave',
  onBreadcrumbContextmenu: 'breadcrumb:contextmenu',
};

const LAYER_EVENT_MAP = {
  onLayerClick: 'click',
  onLayerDblClick: 'dblclick',
  onLayerMousemove: 'mousemove',
  onLayerMousedown: 'mousedown',
  onLayerMouseup: 'mouseup',
  onLayerMouseenter: 'mouseenter',
  onLayerMouseleave: 'mouseleave',
  onLayerContextmenu: 'contextmenu',
};

type Handler = (...__: any[]) => {};

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
