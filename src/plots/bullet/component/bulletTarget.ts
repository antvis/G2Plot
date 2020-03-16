import BBox from '../../../util/bbox';
import { View, Geometry, IGroup, IElement } from '../../../dependents';
import { find, map } from '@antv/util';

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
  private container: IGroup;
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
    this.container = this.view.foregroundGroup.addGroup();
    this.container.set('name', 'targetGroups');
    const shapes = map(this.getGeometry().elements, (element: any) => element.shape);
    for (let i = 0; i < this.cfg.targets.length; i += 1) {
      const shapeBox = shapes[i].getBBox();
      const widthRatio = shapeBox.width / shapes[i].get('origin').data[this.cfg.yField];
      this.drawTarget(shapeBox, this.cfg.targets[i], widthRatio);
    }
    this.view.canvas.draw();
  }

  protected drawTarget(box: BBox, targets: number[], widthRatio: number) {
    const options = this.cfg;
    const colors = options.markerColors;
    /** 添加目标值 */
    targets.forEach((target: number, i) => {
      const markerStyle = options.markerStyle;
      const targetRect = this.container.addShape('rect', {
        name: 'bullet-target',
        attrs: {
          width: markerStyle.width,
          height: box.height * options.markerSize - markerStyle.width / 2,
          x: box.minX + target * widthRatio,
          y: box.minY - (box.height * (options.markerSize - 1)) / 2,
          ...markerStyle,
          fill: colors[i % colors.length] || markerStyle.fill,
        },
      });
    });
  }

  public clear() {
    if (this.container) {
      this.container.clear();
    }
  }

  public destroy() {
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

  private getGeometry() {
    return find(this.view.geometries, (geometry) => geometry.type === 'interval') as Geometry;
  }
}