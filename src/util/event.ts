import * as _ from '@antv/util';
import ViewLayer from '../base/view-layer';

interface IEventmap {
  [k: string]: string;
}

const EVENT_MAP: IEventmap = {
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
};

type Handler = (...__: any[]) => {};

function onEvent(layer: ViewLayer, eventName: string, handler: Handler) {
  layer.view.on(eventName, handler);
}

export { IEventmap, EVENT_MAP, CANVAS_EVENT_MAP, onEvent };
