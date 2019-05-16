import * as _ from '@antv/util';
/** 事件类型
 * click | dblclick | mousemove | contextmenu
 */

interface IEventmap {
  [k:string]: string;
}

const EVENT_MAP:IEventmap = {
  onPlotClick: 'click',
  onPlotDblclick: 'dblclick',
  onPlotMousemove: 'mousemove',
  onPlotContextmenu: 'contextmenu',
  onAxisClick: 'axis-label:click',
  onAxisDblclick: 'axis-label:dblclick',
  onAxisMousemove: 'axis-label:mousemove',
  onAxisContextmenu: 'axis-label:contextmenu',
  onLabelClick: 'label:click',
  onLabelDblclick: 'label:dblclick',
  onLabelMousemove: 'label:mousemove',
  onLabelContextmenu: 'label:contextmenu',
  onLegendClick: 'legend-item:click',
  onLegendDblclick: 'legend-item:dblclick',
  onLegendMousemove: 'legend-item:mousemove',
  onLegendContextmenu: 'legend-item:contextmenu',
};

function onEvent(plot, eventName, handler) {
  const g2Plot = plot.plot;
  g2Plot.on(eventName, handler);
  plot.eventHandlers.push({type: eventName,
    handler});
}

export {
    IEventmap,
    EVENT_MAP,
    onEvent,
};
