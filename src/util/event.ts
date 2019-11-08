import * as _ from '@antv/util';
import ViewLayer from '../base/view-layer';
/** 事件类型
 * click | dblclick | mousemove | contextmenu
 */

interface IEventmap {
  [k: string]: string;
}

const EVENT_MAP: IEventmap = {
  onPlotClick: 'click',
  onPlotDblclick: 'dblclick',
  onPlotMousemove: 'mousemove',
  onPlotMousedown: 'mousedown',
  onPlotMouseup: 'mouseup',
  onPlotMouseenter: 'mouseenter',
  onPlotMouseleave: 'mouseleave',
  onPlotContextmenu: 'contextmenu',
  onAxisClick: 'axis-label:click',
  onAxisDblclick: 'axis-label:dblclick',
  onAxisMousemove: 'axis-label:mousemove',
  onAxisMousedown: 'axis-label:mousedown',
  onAxisMouseup: 'axis-label:mouseup',
  onAxisMouseenter: 'axis-label:mouseenter',
  onAxisMouseleave: 'axis-label:mouseleave',
  onAxisContextmenu: 'axis-label:contextmenu',
  onLabelClick: 'label:click',
  onLabelDblclick: 'label:dblclick',
  onLabelMousemove: 'label:mousemove',
  onLabelMouseup: 'label:mouseup',
  onLabelMousedown: 'label:mousedown',
  onLabelMouseenter: 'label:mouseenter',
  onLabelMouseleave: 'label:mouseleave',
  onLabelContextmenu: 'label:contextmenu',
  onLegendClick: 'legend-item:click',
  onLegendDblclick: 'legend-item:dblclick',
  onLegendMouseMove: 'legend-item:mousemove',
  onLegendMouseDown: 'legend-item:mousedown',
  onLegendMouseUp: 'legend-item:mouseup',
  onLegendMouseLeave: 'legend-item:mouseleave',
  onLegendMouseEnter: 'legend-item:mouseenter',
  onLegendContextmenu: 'legend-item:contextmenu',
};

type Handler = (...__: any[]) => {};

function onEvent(layer: ViewLayer, eventName: string, handler: Handler) {
  layer.view.on(eventName, handler);
}

export { IEventmap, EVENT_MAP, onEvent };
