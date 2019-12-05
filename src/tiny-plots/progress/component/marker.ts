import * as _ from '@antv/util';
import { View } from '@antv/g2';
import { Group, Shape, Canvas } from '@antv/g';

export interface IMarker {
  value: number;
  style?: any;
}

export default class Marker {
  protected canvas: Canvas;
  protected view: View;
  protected coord: any; //fixme: 类型定义
  protected container: Group;
  protected shape: Shape;
  protected progressSize: number;
  protected value: number;
  protected style: any;

  constructor(cfg) {
    _.assign(this, cfg);
    this.init();
  }

  public destory() {
    if (this.shape) {
      this.shape.destroy();
    }
  }

  protected init() {
    this.coord = this.view.get('coord');
    this.container = this.view.get('container');
    const x = this.coord.convert({ x: 0, y: this.value }).x; // progress坐标系是转置坐标系
    const y0 = this.coord.center.y - this.progressSize / 2 - 2;
    const y1 = this.coord.center.y + this.progressSize / 2 + 2;
    const style = _.deepMix({}, { stroke: 'grey', lineWidth: 1 }, this.style);
    this.shape = this.container.addShape('path', {
      attrs: {
        path: [
          ['M', x, y0],
          ['L', x, y1],
        ],
        ...style,
      },
      name: 'progress-marker',
    });
    this.canvas.draw();
  }
}
