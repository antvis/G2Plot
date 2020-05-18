import EventEmitter from '@antv/event-emitter';
import { ICanvas, IGroup } from '../dependents';
import { deepMix, each, findIndex, keys, contains, isFunction } from '@antv/util';
import { Point } from '../interface/config';
import { LAYER_EVENT_MAP } from '../util/event';
import BBox from '../util/bbox';

export interface LayerConfig {
  /** @ignore */
  id?: string;
  /** the top-left-x of layer, local position relative to the parent layer */
  /** @ignore */
  x?: number;
  /** the top-left-y of layer, local position relative to the parent layer */
  /** @ignore */
  y?: number;
  /** layer width */
  width?: number;
  /** layer height */
  height?: number;
  /** the parent node of layer */
  /** @ignore */
  parent?: any;
  /** @ignore */
  canvas?: ICanvas;
  name?: string;
}

export interface Region {
  /** the top-left corner of layer-range, range from 0 to 1, relative to parent layer's range */
  readonly start: Point;
  /** the bottom-right corner of layer-range, range from 0 to 1, relative to parent layer's range */
  readonly end: Point;
}

export interface Range {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export default class Layer<T extends LayerConfig = LayerConfig> extends EventEmitter {
  public id: string;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public parent: Layer;
  public canvas: ICanvas;
  public layerBBox: BBox;
  public layers: Layer[] = [];
  public container: IGroup;
  public destroyed: boolean = false;
  protected visibility: boolean = true;
  protected layerRegion: Region;
  private rendered: boolean = false;
  private eventHandlers: any[] = [];
  public options: T;

  /**
   * layer base for g2plot
   */
  constructor(props: T) {
    super();
    this.options = this.getOptions(props);
    this.processOptions(this.options);
  }

  public processOptions(options) {
    this.id = options.id;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width;
    this.height = options.height;
    this.canvas = options.canvas;
    this.parent = options.parent;
  }

  public updateConfig(cfg: Partial<T>): void {
    this.options = deepMix({}, this.options, cfg);
    this.processOptions(this.options);
  }

  public beforeInit() {
    return null;
  }

  /**
   * init life cycle
   */
  public init() {
    this.layerBBox = this.getLayerBBox();
    this.layerRegion = this.getLayerRegion();
    this.eachLayer((layer) => {
      layer.init();
    });
  }

  public afterInit() {
    return null;
  }

  /**
   * render layer recursively
   */
  public render() {
    // fixme: 等plot不再继承layer，这个就可以挪到构造函数里去，不需要再加是否render过的判断了
    if (!this.rendered) {
      this.container = this.parent ? this.parent.container.addGroup() : this.canvas.addGroup();
    }
    this.rendered = true;
    this.beforeInit();
    this.init();
    this.afterInit();
    //(this.container, [['t', this.x, this.y]]);
    this.eachLayer((layer) => {
      layer.render();
    });
    this.canvas.draw();
  }

  /**
   * clear layer content
   */
  public clear() {
    this.eachLayer((layer) => {
      layer.destroy();
    });
    this.layers = [];
    this.container.clear();
  }

  /**
   * destroy layer recursively, remove the container of layer
   */
  public destroy() {
    this.eachLayer((layer) => {
      layer.destroy();
    });
    each(this.eventHandlers, (h) => {
      this.off(h.eventName, h.handler);
    });
    this.container.remove(true);
    this.destroyed = true;
  }

  /**
   * display layer
   */
  public show() {
    this.container.attr('visible', true);
    this.container.set('visible', true);
    this.visibility = true;
    this.canvas.draw();
  }

  /**
   * hide layer
   */
  public hide() {
    this.container.attr('visible', false);
    this.container.set('visible', false);
    this.visibility = false;
    this.canvas.draw();
  }

  /**
   * add children layer
   * @param layer
   */
  public addLayer(layer: Layer<any>) {
    const idx = findIndex(this.layers, (item) => item === layer);
    if (idx < 0) {
      if (layer.parent !== this) {
        layer.parent = this;
        layer.init();
      }
      this.layers.push(layer);
    }
  }

  /**
   * remove children layer
   * @param layer
   */
  public removeLayer(layer: Layer<any>) {
    const idx = findIndex(this.layers, (item) => item === layer);
    if (idx >= 0) {
      this.layers.splice(idx, 1);
    }
  }

  /**
   * update layer's display range
   * @param props
   * @param recursive whether update children layers or not
   */
  public updateBBox(props: Range, recursive: boolean = false) {
    const originRange = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
    const newRange = deepMix({}, originRange, props);
    this.x = newRange.x;
    this.y = newRange.y;
    this.width = newRange.width;
    this.height = newRange.height;
    this.layerBBox = this.getLayerBBox();
    this.layerRegion = this.getLayerRegion();
    this.render();
    if (recursive) {
      this.eachLayer((layer) => {
        layer.updateBBoxByParent();
        layer.render();
      });
    }
    this.canvas.draw();
  }

  /**
   * update display range according to parent layer's range
   */
  public updateBBoxByParent() {
    const region = this.layerRegion;
    this.x = this.parent.x + this.parent.width * region.start.x;
    this.y = this.parent.y + this.parent.height * region.start.y;
    this.width = this.parent.width * (region.end.x - region.start.x);
    this.height = this.parent.height * (region.end.y - region.start.y);
    this.layerBBox = this.getLayerBBox();
  }

  /**
   * get global position of layer
   */
  public getGlobalPosition() {
    let globalX = this.x;
    let globalY = this.y;
    let parent = this.parent;
    while (parent) {
      globalX += parent.x;
      globalY += parent.y;
      parent = parent.parent;
    }
    return { x: globalX, y: globalY };
  }

  public getGlobalBBox() {
    const globalPosition = this.getGlobalPosition();
    return new BBox(globalPosition.x, globalPosition.y, this.width, this.height);
  }

  public getOptions(props: Partial<T>): T {
    let parentWidth = 0;
    let parentHeight = 0;
    if (props.parent) {
      parentWidth = props.parent.width;
      parentHeight = props.parent.height;
    }
    const defaultOptions = {
      x: 0,
      y: 0,
      width: parentWidth,
      height: parentHeight,
    };
    return deepMix({}, defaultOptions, props);
  }

  public eachLayer(cb: (layer: Layer<any>) => void) {
    each(this.layers, cb);
  }

  protected parseEvents(eventParser?) {
    const eventsName = keys(LAYER_EVENT_MAP);
    each(eventParser, (e, k) => {
      if (contains(eventsName, k) && isFunction(e)) {
        const eventName = LAYER_EVENT_MAP[k] || k;
        const handler = e;
        this.on(eventName, handler);
        this.eventHandlers.push({ name: eventName, handler });
      }
    });
  }

  private getLayerBBox() {
    return new BBox(this.x, this.y, this.width, this.height);
  }

  private getLayerRegion() {
    if (this.parent) {
      const parentWidth = this.parent.width;
      const parentHeight = this.parent.height;
      const parentX = this.parent.x;
      const parentY = this.parent.y;
      const startX = (this.x - parentX) / parentWidth;
      const startY = (this.y - parentY) / parentHeight;
      const endX = (this.x + this.width - parentX) / parentWidth;
      const endY = (this.y + this.height - parentY) / parentHeight;
      return { start: { x: startX, y: startY }, end: { x: endX, y: endY } };
    }
    return { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } };
  }
}
