import { Group, BBox } from '@antv/g';
import { View } from '@antv/g2';
import * as _ from '@antv/util';

export interface BulletTargetCfg {
  targets: number[][];
  markerSize: number;
  yField: string;
  markerColors: string[];
  markerStyle?: {
    fill?: string;
    stroke?: string;
    strokeOpacity?: number;
    [k: string]: any;
  };
}

export default class BulletTarget {
  private view: View;
  private container: Group;
  private cfg: BulletTargetCfg;

  constructor(view: View, cfg: BulletTargetCfg) {
    this.view = view;
    this.cfg = cfg;
    this._init();
  }

  /** 绘制辅助labels */
  public draw() {
    if (!this.view || this.view.destroyed) {
      return;
    }
    this.container = this.view.get('frontgroundGroup').addGroup();
    this.container.set('name', 'targetGroups');
    const shapes = this.view
      .get('elements')[0]
      .get('shapeContainer')
      .get('children');
    for (let i = 0; i < this.cfg.targets.length; i += 1) {
      const shapeBox = shapes[i].getBBox();
      const widthRatio = shapeBox.width / shapes[i].get('origin')._origin[this.cfg.yField];
      this.drawTarget(shapeBox, this.cfg.targets[i], widthRatio);
    }
    this.view.get('canvas').draw();
  }

  protected drawTarget(box: BBox, targets: number[], widthRatio: number) {
    const options = this.cfg;
    const colors = options.markerColors;
    /** 添加目标值 */
    targets.forEach((target: number, i) => {
      const markerStyle = options.markerStyle;
      const targetRect = this.container.addShape('rect', {
        attrs: {
          width: markerStyle.width,
          height: box.height * options.markerSize - markerStyle.width / 2,
          x: box.minX + target * widthRatio,
          y: box.minY - (box.height * (options.markerSize - 1)) / 2,
          ...markerStyle,
          fill: colors[i % colors.length] || markerStyle.fill,
        },
      });
      targetRect.name = 'bullet-target';
    });
  }

  public clear() {
    if (this.container) {
      this.container.clear();
    }
  }
  
  public destory() {
    if (this.container) {
      this.container.remove();
    }
  }

  private _init() {
    this.view.on('beforerender', () => {
      this.clear();
    });

    this.view.on('afterrender', () => {
      this.draw();
    });
  }
}
