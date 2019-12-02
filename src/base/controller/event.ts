import * as _ from '@antv/util';
import { Canvas, Shape } from '@antv/g';
import BasePlot from '../plot';

interface ControllerConfig {
  canvas: Canvas;
  plot: BasePlot;
}

function isSameShape(shape1: Shape, shape2: Shape) {
  if (shape1 && shape2 && shape1 === shape2) {
    return true;
  }
  return false;
}

export default class EventController {
  private plot: BasePlot;
  private canvas: Canvas;
  private eventHandlers: any[];
  private lastShape: Shape;

  constructor(cfg: ControllerConfig) {
    this.plot = cfg.plot;
    this.canvas = cfg.canvas;
    this.eventHandlers = [];
  }

  public bindEvents() {
    this.addEvent(this.canvas, 'mousedown', _.wrapBehavior(this, 'onEvents'));
    this.addEvent(this.canvas, 'mousemove', _.wrapBehavior(this, 'onMove'));
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
    // 判断是否拾取到view以外的shape
    const { target } = ev;
    if (target.isShape && !this.isShapeInView(target) && target.name) {
      this.plot.emit(`${target.name}:${ev.type}`, ev);
    }
    this.plot.emit(`${ev.type}`, ev);
    // layer事件
    //const layers = this.plot.
  }

  private onMove(ev) {
    const { target } = ev;
    // shape的mouseenter, mouseleave和mousemove事件
    if (target.isShape && !this.isShapeInView(target) && target.name) {
      this.plot.emit(`${target.name}:${ev.type}`, ev);
      // mouseleave & mouseenter
      if (this.lastShape && !isSameShape(target, this.lastShape)) {
        if (this.lastShape) {
          this.plot.emit(`${this.lastShape.name}:mouseleave`, ev);
        }
        this.plot.emit(`${target.name}:mouseenter`, ev);
      }
      this.lastShape = target;
    }
    this.plot.emit('mousemove', ev);
  }

  private isShapeInView(shape) {
    const groupName = ['frontgroundGroup', 'backgroundGroup', 'panelGroup'];
    let parent = shape.get('parent');
    while (parent) {
      const parentName = parent.get('name');
      if (parentName && _.contains(groupName, parentName)) {
        return true;
      }
      parent = parent.get('parent');
    }
    return false;
  }
}
