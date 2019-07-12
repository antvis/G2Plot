/**负责将shape数据转为node，使shape根据node数据进行update */
import * as _ from '@antv/util';
import { Shape } from '@antv/g';
import * as MathUtil from '../math';

function  applyMatrix(point, matrix, tag = 1) {
  const vector = [ point.x, point.y, tag ];
  _.vec3.transformMat3(vector, vector, matrix);
  return {
    x: vector[0],
    y: vector[1],
  };
}

interface NodesCfg {
  shapes: Shape[];
}
export interface INode {
  width: Number;
  height: Number;
  centerX: Number;
  centerY: Number;
  top: Number;
  bottom: Number;
  left: Number;
  right: Number;
  topLeft?: {};
  topRight?: {};
  bottomLeft?: {};
  bottomRight?: {};
  shape?: Shape;
}

export default class Nodes {
  shapes: Shape[];
  nodes: INode[];
  constructor(cfg: NodesCfg) {
    this.shapes = cfg.shapes;
    this.nodes = [];
    this._parserNodes();
  }

  private _parserNodes() {
    _.each(this.shapes, (shape) => {
      const node = this.measure(shape);
      this.nodes.push(node);
    });
  }

  public measure(shape) {
    const node = _.deepMix({}, MathUtil.bboxOnRotate(shape), { shape });
    return node;
  }

  public measureNodes() {
    const nodes = [];
    const shapes = [];
    _.each(this.shapes, (shape) => {
      const node = this.measure(shape);
      if (node.width !== 0 && node.height !== 0) {
        nodes.push(node);
        shapes.push(shape);
      }
           // this.nodes[index] = node;
    });
    this.nodes = nodes;
    this.shapes = shapes;
  }

  public updateShapes() {

  }

}
