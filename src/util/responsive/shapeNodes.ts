/** 负责将shape数据转为node，使shape根据node数据进行update */
import { Shape } from '@antv/g';
import * as _ from '@antv/util';
import * as MathUtil from '../math';

interface NodesCfg {
  shapes: Shape[];
}
export interface IShapeNode {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  topLeft?: {};
  topRight?: {};
  bottomLeft?: {};
  bottomRight?: {};
  shape?: Shape;
}

export default class ShapeNodes {
  public shapes: Shape[];
  public nodes: IShapeNode[];
  public origion_nodes: IShapeNode[];
  public type: string = 'shape';
  constructor(cfg: NodesCfg) {
    this.shapes = cfg.shapes;
    this.nodes = [];
    this._parserNodes();
    this.origion_nodes = _.deepMix([], this.nodes);
  }

  public measure(shape) {
    const node = _.deepMix({}, MathUtil.bboxOnRotate(shape), { shape });
    return node;
  }

  public measureNodes() {
    const nodes = [];
    const shapes = [];
    _.each(this.shapes, (shape, index) => {
      const node = _.deepMix({}, this.nodes[index], this.measure(shape));
      if (node.width !== 0 && node.height !== 0) {
        nodes.push(node);
        shapes.push(shape);
      }
      // this.nodes[index] = node;
    });
    this.nodes = nodes;
    this.shapes = shapes;
  }

  public updateShapes() {}

  private _parserNodes() {
    _.each(this.shapes, (shape) => {
      const node = this.measure(shape);
      this.nodes.push(node);
    });
  }
}
