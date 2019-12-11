import * as _ from '@antv/util';
import { View } from '@antv/g2';
import { Group, Shape, Canvas } from '@antv/g';

export interface MarkerConfig {
  view: View;
  canvas: Canvas;
  progressSize: number;
  value: number;
  style?: any;
}

export default class Marker<T extends MarkerConfig = MarkerConfig> {
  public canvas: Canvas;
  public view: View;
  public progressSize: number;
  public value: number;
  public style: any;
  protected coord: any; //fixme: 类型定义
  protected container: Group;
  protected shape: Shape;

  constructor(cfg) {
    _.assign(this, cfg);
    this.init();
  }

  public destroy() {
    if (this.shape) {
      this.shape.destroy();
    }
  }

  public update(cfg: MarkerConfig, duration: number, easing: string) {
    let updateCfg: any = {};
    _.assign(this, cfg);
    this.coord = this.view.get('coord');
    if (cfg.value) {
      const x = this.coord.convert({ x: 0, y: this.value }).x;
      const matrix = [1, 0, 0, 0, 1, 0, x, 0, 1];
      updateCfg.matrix = matrix;
    }
    if (cfg.style) {
      const origin_attr = this.shape.attrs;
      const attrs = _.deepMix({}, origin_attr, cfg.style);
      updateCfg = _.deepMix({}, attrs, updateCfg);
    }
    this.shape.stopAnimate();
    this.shape.animate(updateCfg, duration, easing);
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
          ['M', 0, y0],
          ['L', 0, y1],
        ],
        ...style,
      },
      name: 'progress-marker',
    });
    this.shape.move(x, 0);
    this.canvas.draw();
  }
}
