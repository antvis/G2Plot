import { LabelItem } from '@antv/component/lib/interface';
import Polar from '@antv/coord/lib/coord/polar';
import { Shape } from '@antv/g';
import { registerGeometryLabel } from '@antv/g2';
import * as _ from 'lodash';
import { getEndPoint, getOverlapInfo } from './utils';
import BaseLabel from './base-label';
import { distBetweenPoints } from '../../../../util/math';

export function percent2Number(value: string): number {
  const percentage = Number(value.endsWith('%') ? value.slice(0, -1) : value);
  return percentage / 100;
}

/**
 * @desc 饼图 inner-label 布局
 * @done
 */
class InnerLabel extends BaseLabel {
  public adjustPosition(labels: Shape[], items: LabelItem[], coord: Polar) {
    const center = coord.getCenter();
    const radius = coord.getRadius();
    const offset = this.getOffsetOfLabel();
    const r = radius + offset;
    labels.forEach((label, idx) => {
      const anchor = items.find((i) => i.id === label.id);
      const { x: newX, y: newY } = getEndPoint(center, anchor.angle, r);
      label.attr('x', newX);
      label.attr('y', newY);
      label.attr('textBaseline', 'middle');

      if (idx > 0) {
        const prevLabel = labels[idx - 1];
        this.resolveCollision(label, prevLabel, anchor, coord);
      }
    });
  }

  /** @override inner布局不需要拉线 */
  public adjustLines(labels: Shape[], items: LabelItem[], labelLines: any[], coord: Polar) {
    labelLines.forEach((l) => l.set('visible', false));
  }

  /** @override */
  protected adjustLabelText() {}

  /** @override 不能大于0 */
  protected getOffsetOfLabel(): number {
    const labelOptions = this.get('labelOptions');
    let offset = labelOptions.offset;
    const radius = this.get('coord').getRadius();
    if (_.isString(offset)) {
      offset = radius * percent2Number(offset);
    }
    return offset > 0 ? 0 : offset;
  }

  /** label 碰撞调整 */
  private resolveCollision(label: Shape, prev: Shape, anchor: LabelItem, coord: Polar): void {
    const angle = anchor.angle;
    const box = label.getBBox();
    const prevBBox = prev.getBBox();
    const pos = { x: (box.minX + box.maxX) / 2, y: (box.minY + box.maxY) / 2 };
    // 两种调整方案
    /** 先偏移 x 方向 -> 再计算 y 位置 */
    const pos1 = _.clone(pos);
    /** 先偏移 y 方向 -> 再计算 x 位置 */
    const pos2 = _.clone(pos);
    // check overlap
    if (prev.id !== label.id) {
      const { xOverlap, yOverlap } = getOverlapInfo(box, prevBBox);
      if (xOverlap) {
        pos1.x = pos.x + xOverlap;
        pos1.y = pos.y + Math.tan(angle) * xOverlap;
      }
      if (yOverlap) {
        // fix issue-460
        let yMover = yOverlap;
        const center = coord.getCenter();
        if (pos.y < center.y) {
          // 上方label优先往上偏移
          yMover = yMover < 0 ? yMover : prevBBox.minY - box.maxY;
        } else {
          // 下方label优先往下偏移
          yMover = yMover > 0 ? yMover : prevBBox.maxY - box.minY;
        }
        pos2.y = pos.y + yMover;
        pos2.x = pos.x + yMover / Math.tan(angle);
      }

      const dist1 = distBetweenPoints(pos, pos1);
      const dist2 = distBetweenPoints(pos, pos2);
      const actualPos = dist1 < dist2 ? pos1 : pos2;
      // 取偏移距离最小的
      label.attr('x', actualPos.x);
      label.attr('y', actualPos.y);
    }
  }
}

registerGeometryLabel('inner', InnerLabel);
