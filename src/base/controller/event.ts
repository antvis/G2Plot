import { wrapBehavior, each, contains } from '@antv/util';
import { ICanvas, IShape } from '../../dependents';
import BBox from '../../util/bbox';
import BasePlot from '../plot';
import Layer from '../layer';
import { Point } from '../../interface/config';

interface ControllerConfig {
  canvas: ICanvas;
  plot: BasePlot;
}

interface IEventHandler {
  target: ICanvas;
  type: string;
  handler: Function;
}

interface EventObj {
  x: number;
  y: number;
  target: any;
  event: object;
}

function isSameShape(shape1: IShape, shape2: IShape) {
  if (shape1 && shape2 && shape1 === shape2) {
    return true;
  }
  return false;
}

function isPointInBBox(point: Point, bbox: BBox) {
  if (point.x >= bbox.minX && point.x <= bbox.maxX && point.y >= bbox.minY && point.y <= bbox.maxY) {
    return true;
  }
  return false;
}

export default class EventController {
  private plot: BasePlot;
  private canvas: ICanvas;
  private eventHandlers: IEventHandler[];
  private lastShape: any;

  constructor(cfg: ControllerConfig) {
    this.plot = cfg.plot;
    this.canvas = cfg.canvas;
    this.eventHandlers = [];
  }

  public bindEvents() {
    this.addEvent(this.canvas, 'mousedown', wrapBehavior(this, 'onEvents'));
    this.addEvent(this.canvas, 'mousemove', wrapBehavior(this, 'onMove'));
    this.addEvent(this.canvas, 'mouseup', wrapBehavior(this, 'onEvents'));
    this.addEvent(this.canvas, 'click', wrapBehavior(this, 'onEvents'));
    this.addEvent(this.canvas, 'dblclick', wrapBehavior(this, 'onEvents'));
    this.addEvent(this.canvas, 'contextmenu', wrapBehavior(this, 'onEvents'));
    this.addEvent(this.canvas, 'wheel', wrapBehavior(this, 'onEvents'));
  }

  public clearEvents() {
    const eventHandlers = this.eventHandlers;
    each(eventHandlers, (eh) => {
      eh.target.off(eh.type, eh.handler);
    });
  }

  private addEvent(target: ICanvas, eventType: string, handler: Function) {
    target.on(eventType, handler);
    this.eventHandlers.push({ target, type: eventType, handler });
  }

  private onEvents(ev) {
    const eventObj = this.getEventObj(ev);
    const target: any = ev.target;
    // 判断是否拾取到view以外的shape
    if (!this.isShapeInView(target) && target.name) {
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
    const target: any = ev.target;
    const eventObj = this.getEventObj(ev);
    // shape的mouseenter, mouseleave和mousemove事件
    if (!this.isShapeInView(target) && target.name) {
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

  private isShapeInView(shape: IShape) {
    const groupName = ['frontgroundGroup', 'backgroundGroup', 'panelGroup'];
    let parent = shape.get('parent');
    while (parent) {
      const parentName = parent.get('name');
      if (parentName && contains(groupName, parentName)) {
        return true;
      }
      parent = parent.get('parent');
    }
    return false;
  }

  private getEventObj(ev) {
    const obj = {
      clientX: ev.clientX,
      clientY: ev.clientY,
      x: ev.x,
      y: ev.y,
      plot: this.plot,
      data: ev.data ? ev.data.data : null,
      canvas: this.canvas,
      target: ev.target,
      gEvent: ev, // g事件的event
    };
    return obj;
  }

  private onLayerEvent(layers: Layer[], eventObj: EventObj, eventName: string) {
    each(layers, (layer) => {
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
