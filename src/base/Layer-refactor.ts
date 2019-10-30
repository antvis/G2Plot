import EventEmitter from '@antv/event-emitter';
import { BBox, Canvas, Group } from '@antv/g';
import * as _ from '@antv/util';
import { Point } from '../interface/config';

export interface LayerCfg {
  id?: string;
  /** the top-left-x of layer, local position relative to the parent layer */
  x: number;
  /** the top-left-y of layer, local position telative to the parent layer */
  y: number;
  /** layer width */
  width?: number;
  /** layer height */
  height?: number;
  /** the parent node of layer */
  parent?: any;
  canvas: Canvas;
}

export interface Region {
  /** the top-left corner of layer-range, range from 0 to 1, relative to parent layer's range */
  readonly start: Point;
  /** the bottom-right corner of layer-range, range from 0 to 1, relative to parent layer's range */
  readonly end: Point;
}

export interface Range {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default class Layer<T = void> extends EventEmitter {
  public id: string;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public parent: Layer;
  public canvas: Canvas;
  public layerRange: BBox;
  public layers: Layer[] = [];
  public container: Group;
  protected visibility: boolean = true;
  protected destroyed: boolean = false;
  protected layerRegion: Region;

  /**
   * layer base for g2plot
   */
  constructor(props: LayerCfg) {
    super();
    const defaultOptions = this.getDefaultOptions(props);
    const options = _.deepMix({}, defaultOptions, props);
    this.id = options.id;
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.canvas = options.canvas;
    this.parent = options.parent;
    this.init();
  }

  /**
   * init life cycle
   */
  public init() {
    if (this.parent) {
      this.container = this.parent.container.addGroup();
    } else {
      this.container = this.canvas.addGroup();
    }
    this.container.transform([['t', this.x, this.y]]);
    this.layerRange = this.calculateLayerRange();
    this.layerRegion = this.calculateLayerRegion();
    this.eachLayer((layer) => {
      layer.init();
    });
  }

  /**
   * render layer recursively
   */
  public render() {
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
      layer.destory();
    });
    this.layers = [];
    this.container.clear();
  }

  /**
   * destory layer recursively, remove the container of layer
   */
  public destroy() {
    this.eachLayer((layer) => {
      layer.destroy();
    });
    this.container.remove(true);
    this.destroyed = true;
  }

  /**
   * display layer
   */
  public show() {
    this.container.set('visible', true);
    this.visibility = true;
  }

  /**
   * hide layer
   */
  public hide() {
    this.container.set('visible', false);
    this.visibility = false;
  }

  /**
   * add children layer
   * @param layer
   */
  public addLayer(layer: Layer) {
    layer.parent = this;
    layer.init();
    this.layers.push(layer);
  }

  /**
   * remove children layer
   * @param layer
   */
  public removeLayer(layer: Layer) {
    const idx = _.findIndex(this.layers, (item) => item === layer);
    if (idx >= 0) {
      this.layers.splice(idx, 1);
    }
  }

  /**
   * update layer's display range
   * @param props
   * @param recursive whether update children layers or not
   */
  public updateRange(props: Range, recursive: boolean = false) {
    const origin_range = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
    const new_range = _.deepMix({}, origin_range, props);
    this.x = new_range.x;
    this.y = new_range.y;
    this.width = new_range.width;
    this.height = new_range.height;
    this.layerRange = this.calculateLayerRange();
    this.layerRegion = this.calculateLayerRegion();
    this.render();
    if (recursive) {
      this.eachLayer((layer) => {
        layer.updateRangeByParent();
        layer.render();
      });
    }
    this.canvas.draw();
  }

  /**
   * update display range according to parent layer's range
   */
  public updateRangeByParent() {
    const region = this.layerRegion;
    this.x = this.parent.x + this.parent.width * region.start.x;
    this.y = this.parent.y + this.parent.height * region.start.y;
    this.width = this.parent.width * (region.end.x - region.start.x);
    this.height = this.parent.height * (region.end.y - region.start.y);
    this.layerRange = this.calculateLayerRange();
  }

  /**
   * get global postion of layer
   */
  public getGlobalPosition() {
    let global_x = this.x;
    let global_y = this.y;
    let parent = this.parent;
    while (parent) {
      global_x += parent.x;
      global_y += parent.y;
      parent = parent.parent;
    }
    return { x: global_x, y: global_y };
  }

  private getDefaultOptions(props: LayerCfg) {
    let parent_width = 0;
    let parent_height = 0;
    if (props.parent) {
      parent_width = props.parent.width;
      parent_height = props.parent.height;
    }
    return {
      x: 0,
      y: 0,
      width: parent_width,
      height: parent_height,
    };
  }

  private calculateLayerRange() {
    return new BBox(this.x, this.y, this.width, this.height);
  }

  private calculateLayerRegion() {
    if (this.parent) {
      const parent_width = this.parent.width;
      const parent_height = this.parent.height;
      const parent_x = this.parent.x;
      const parent_y = this.parent.y;
      const start_x = (this.x - parent_x) / parent_width;
      const start_y = (this.y - parent_y) / parent_height;
      const end_x = (this.x + this.width - parent_x) / parent_width;
      const end_y = (this.y + this.height - parent_y) / parent_height;
      return { start: { x: start_x, y: start_y }, end: { x: end_x, y: end_y } };
    }

    return { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } };
  }

  private eachLayer(cb: (layer) => void) {
    _.each(this.layers, cb);
  }
}
