import EventEmitter from '@antv/event-emitter';
import { BBox } from '@antv/g';

export interface LayerCfg {
  position: { x: number; y: number };
  width: number;
  height: number;
  parent: any;
}

export default abstract class Layer<T = void> extends EventEmitter {
  public layerBBox: BBox;
  public layers: Layer[];
  protected position: { x: number; y: number } = { x: 0, y: 0 };
  protected width: number;
  protected height: number;
  protected parent: Layer;
  protected visibility: boolean = true;

  constructor(props: LayerCfg) {
    super();
  }
}
