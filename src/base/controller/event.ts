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

function isPointInBBox(point, bbox) {
  if (point.x >= bbox.minX && point.x <= bbox.maxX && point.y >= bbox.minY && point.y <= bbox.maxY) {
    return true;
  }
  return false;
}

export default class EventController {
  private plot: BasePlot;
  private canvas: Canvas;
  private pixelRatio: number;
  private eventHandlers: any[];
  private lastShape: Shape;

  constructor(cfg: ControllerConfig) {
    this.plot = cfg.plot;
    this.canvas = cfg.canvas;
    this.pixelRatio = this.canvas.get('pixelRatio');
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

  public clearEvents() {
    const eventHandlers = this.eventHandlers;
    _.each(eventHandlers, (eh) => {
      eh.target.off(eh.type, eh.handler);
    });
  }

  private addEvent(target, eventType, handler) {
    target.on(eventType, handler);
    this.eventHandlers.push({ target, type: eventType, handler });
  }

  private onEvents(ev) {
    const eventObj = this.getEventObj(ev);
    const { target } = ev;
    // 判断是否拾取到view以外的shape
    if (target.isShape && !this.isShapeInView(target) && target.name) {
      this.plot.emit(`${target.name}:${ev.type}`, ev);
    }
    this.plot.emit(`${ev.type}`, eventObj);
    // layer事件
    const layers = this.plot.getLayers();
    if (layers.length > 0) {
      this.onLayerEvent(layers, eventObj, ev.type);
    }
  }

  private onMove(ev) {
    const { target } = ev;
    const eventObj = this.getEventObj(ev);
    // shape的mouseenter, mouseleave和mousemove事件
    if (target.isShape && !this.isShapeInView(target) && target.name) {
      this.plot.emit(`${target.name}:${ev.type}`, eventObj);
      // mouseleave & mouseenter
      if (this.lastShape && !isSameShape(target, this.lastShape)) {
        if (this.lastShape) {
          this.plot.emit(`${this.lastShape.name}:mouseleave`, eventObj);
        }
        this.plot.emit(`${target.name}:mouseenter`, eventObj);
      }
      this.lastShape = target;
    }
    this.plot.emit('mousemove', eventObj);
    // layer事件
    const layers = this.plot.getLayers();
    if (layers.length > 0) {
      this.onLayerEvent(layers, eventObj, 'mousemove');
    }
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

  private getEventObj(ev) {
    const obj = {
      x: ev.x / this.pixelRatio,
      y: ev.y / this.pixelRatio,
      target: ev.target,
      event: ev.event, // g事件的event
    };
    return obj;
  }

  private onLayerEvent(layers, eventObj, eventName) {
    _.each(layers, (layer) => {
      const bbox = layer.getGlobalBBox();
      if (isPointInBBox({ x: eventObj.x, y: eventObj.y }, bbox)) {
        layer.emit(`${eventName}`, eventObj);
        const subLayers = layer.layers;
        if (subLayers.length > 0) {
          this.onLayerEvent(subLayers, eventObj, eventName);
        }
      }
    });
  }
}
