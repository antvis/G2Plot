import EventEmitter from '@antv/event-emitter';
import { BBox, Group } from '@antv/g';
import * as _ from '@antv/util';
import { Point } from '../interface/config';

export interface LayerCfg {
  position?: { x: number; y: number };
  width?: number;
  height?: number;
  parent?: any;
}

export interface Region {
  readonly start: Point;
  readonly end: Point;
}

export default abstract class Layer<T = void> extends EventEmitter {
  public position: { x: number; y: number };
  public width: number;
  public height: number;
  public parent: Layer;
  public layerBBox: BBox;
  public layers: Layer[] = [];
  public container: Group;
  protected visibility: boolean = true;
  protected layerRegion: Region;

  constructor(props: LayerCfg) {
    super();
    const defaultOptions = this.getDefaultOptions(props);
    const options = _.mix(defaultOptions, props);
    this.position = options.position;
    this.width = options.width;
    this.height = options.height;
    this.parent = options.parent;
    this.init();
  }

  public init() {
    this.container = this.parent.container.addGroup();
    this.layerBBox = this.calculateLayerBBox();
    this.layerRegion = this.calculateLayerRegion();
  }

  public updateRange(type: string, recursive: boolean) {}

  private getDefaultOptions(props) {
    return {
      position: { x: 0, y: 0 },
      width: props.parent.width,
      height: props.parent.height,
    };
  }

  private calculateLayerBBox() {
    const { x, y } = this.position;
    return new BBox(x, y, this.width, this.height);
  }

  private calculateLayerRegion() {
    const { x, y } = this.position;
    const parent_width = this.parent.width;
    const parent_height = this.parent.height;
    const parent_x = this.parent.position.x;
    const parent_y = this.parent.position.y;
    const start_x = (x - parent_x) / parent_width;
    const start_y = (y - parent_y) / parent_height;
    const end_x = (x + this.width - parent_x) / parent_width;
    const end_y = (y + this.height - parent_y) / parent_height;
    return { start: { x: start_x, y: start_y }, end: { x: end_x, y: end_y } };
  }
}
