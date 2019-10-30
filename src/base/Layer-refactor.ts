import EventEmitter from '@antv/event-emitter';
import { BBox, Canvas, Group } from '@antv/g';
import * as _ from '@antv/util';
import { Point } from '../interface/config';

export interface LayerCfg {
  x: number;
  y: number;
  width?: number;
  height?: number;
  parent?: any;
  canvas: Canvas;
}

export interface Region {
  readonly start: Point;
  readonly end: Point;
}

export interface Range {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default abstract class Layer<T = void> extends EventEmitter {
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
  protected layerRegion: Region;

  constructor(props: LayerCfg) {
    super();
    const defaultOptions = this.getDefaultOptions(props);
    const options = _.deepMix({}, defaultOptions, props);
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.parent = options.parent;
    this.init();
  }

  public init() {
    this.container = this.parent.container.addGroup();
    this.layerRange = this.calculateLayerRange();
    this.layerRegion = this.calculateLayerRegion();
  }

  public render() {}

  public show() {
    this.container.set('visible', true);
    this.visibility = true;
  }

  public hide() {
    this.container.set('visible', false);
    this.visibility = false;
  }

  public updateRange(props: Range, recursive: boolean = true) {
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

  public updateRangeByParent() {
    const region = this.layerRegion;
    this.x = this.parent.x + this.parent.width * region.start.x;
    this.y = this.parent.y + this.parent.height * region.start.y;
    this.width = this.parent.width * (region.end.x - region.start.x);
    this.height = this.parent.height * (region.end.y - region.start.y);
    this.calculateLayerRegion();
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

  private eachLayer(cb: (layer) => void) {
    _.each(this.layers, cb);
  }
}
