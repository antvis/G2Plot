import { IGroup, View } from '../../../dependents';
import { find, map, get } from '@antv/util';
import { BulletAxis } from '../layer';
import BBox from '../../../util/bbox';

export interface BulletRectCfg {
  /** 背景区间的区间范围 */
  ranges: number[][];
  yField: string;
  rangeColors: string[];
  rangeMax: number;
  rangeSize: number;
  axis?: BulletAxis;
  style?: {
    fill?: string;
    stroke?: string;
    strokeOpacity?: number;
    [k: string]: any;
  };
}

export default class BulletRect {
  private view: View;
  private container: IGroup;
  private cfg: BulletRectCfg;

  constructor(view: View, cfg: BulletRectCfg) {
    this.view = view;
    this.cfg = cfg;
    this._init();
  }

  /** 绘制辅助labels */
  public draw() {
    if (!this.view || this.view.destroyed) {
      return;
    }
    this.container = this.view.middleGroup.addGroup();
    this.container.set('name', 'rectGroups');
    this.container.setZIndex(-100);
    const geometry = this.getGeometry();
    const shapes = map(geometry?.elements, (element) => element.shape);
    for (let i = 0; i < this.cfg.ranges.length; i += 1) {
      const shapeBox = shapes[i].getBBox();
      const widthRatio = shapeBox.width / shapes[i].get('origin').data[this.cfg.yField];
      this.drawRect(shapeBox, this.cfg.ranges[i] || [0, 1], widthRatio);
    }
    this.view.canvas.draw();
  }

  protected drawRect(box: BBox, ranges: number[], widthRatio: number) {
    const options = this.cfg;
    const rangeColors = options.rangeColors;
    let xPos = box.minX;
    const yPos = box.minY - (box.height * (options.rangeSize - 1)) / 2;
    for (let i = 1; i < ranges.length; i += 1) {
      const width = (ranges[i] - ranges[i - 1]) * options.rangeMax * widthRatio;
      this.container
        .addShape('rect', {
          name: 'bullet-rect',
          attrs: {
            width,
            height: box.height * options.rangeSize,
            x: xPos,
            y: yPos,
            fill: rangeColors[(i - 1) % rangeColors.length],
            fillOpacity: 0.25,
          },
        })
        .set('zIndex', -1);
      xPos += width;
    }
    if (options.axis && options.axis.visible) {
      const tickInterval = options.rangeMax / (options.axis.tickCount - 1);
      const rangeBox = new BBox(box.x, yPos, xPos, box.height * options.rangeSize);
      this.drawBulletTicks(rangeBox, tickInterval, widthRatio);
    }
  }

  /** 添加 ticks  */
  protected drawBulletTicks(box: BBox, tickInterval: number, widthRatio: number) {
    const options = this.cfg;
    const ticksStyle = options.axis.style;
    const tickCount = options.axis.tickCount;
    const tickPosition = options.axis.position;
    const tickOffset = get(ticksStyle, 'lineHeight', 0) - ticksStyle.fontSize / 2;
    for (let tickIdx = 0; tickIdx < tickCount; tickIdx += 1) {
      const x = box.minX + tickInterval * tickIdx * widthRatio;
      let tickText = `${tickInterval * tickIdx}`;
      if (options.axis.formatter) {
        tickText = options.axis.formatter(tickText, tickIdx);
      }
      const tickShape = this.container.addShape('text', {
        name: 'tick',
        attrs: {
          x,
          y: tickPosition === 'before' ? box.minY - tickOffset : box.maxY + tickOffset,
          text: `${tickText}`,
          ...ticksStyle,
        },
      });
      if (options.axis.tickLine && options.axis.tickLine.visible) {
        const tickLineCfg = options.axis.tickLine;
        if (tickIdx > 0 && tickIdx !== tickCount - 1) {
          this.container
            .addShape('path', {
              attrs: {
                path: [
                  ['M', x, box.minY],
                  ['L', x, box.maxY],
                ],
                ...tickLineCfg,
              },
            })
            .set('zIndex', -1);
        }
      }
    }
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
    return find(this.view.geometries, (geometry) => geometry.type === 'interval');
  }
}
