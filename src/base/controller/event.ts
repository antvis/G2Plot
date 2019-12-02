import * as _ from '@antv/util';
import { Canvas } from '@antv/g';
import BasePlot from '../plot';

interface ControllerConfig {
  canvas: Canvas;
  plot: BasePlot;
}

export default class EventController {
  private plot: BasePlot;
  private canvas: Canvas;
  private eventHandlers: any[];

  constructor(cfg: ControllerConfig) {
    this.plot = cfg.plot;
    this.canvas = cfg.canvas;
    this.eventHandlers = [];
  }

  public bindEvents() {
    this.addEvent(this.canvas, 'mousedown', _.wrapBehavior(this, 'onEvents'));
    this.addEvent(this.canvas, 'mousemove', _.wrapBehavior(this, 'onEvents'));
    this.addEvent(this.canvas, 'mouseup', _.wrapBehavior(this, 'onEvents'));
    this.addEvent(this.canvas, 'click', _.wrapBehavior(this, 'onEvents'));
    this.addEvent(this.canvas, 'dblclick', _.wrapBehavior(this, 'onEvents'));
    this.addEvent(this.canvas, 'contextmenu', _.wrapBehavior(this, 'onEvents'));
    this.addEvent(this.canvas, 'wheel', _.wrapBehavior(this, 'onEvents'));
  }

  private addEvent(target, eventType, handler) {
    target.on(eventType, handler);
    this.eventHandlers.push({ target, type: eventType, handler });
  }

  private onEvents(ev) {
    this.plot.emit(`${ev.type}`, ev);
  }
}
