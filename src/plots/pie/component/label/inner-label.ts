<<<<<<< HEAD
import { LabelItem } from '@antv/component/lib/interface';
import Polar from '@antv/coord/lib/coord/polar';
import { Shape } from '@antv/g';
import { registerElementLabels } from '@antv/g2';
import { clone, isString } from '@antv/util';
import { getEndPoint, getOverlapInfo } from './utils';
import BaseLabel from './base-label';
=======
import { IShape } from '../../../../dependents';
import { each, clone } from '@antv/util';
import PieBaseLabel, { LabelItem, PieLabelConfig } from './base-label';
import { getOverlapInfo } from './utils';
>>>>>>> 1.x
import { distBetweenPoints } from '../../../../util/math';

export function percent2Number(value: string): number {
  const percentage = Number(value.endsWith('%') ? value.slice(0, -1) : value);
  return percentage / 100;
}

export default class PieInnerLabel extends PieBaseLabel {
  /** @override 不能大于0 */
  protected adjustOption(options: PieLabelConfig) {
    super.adjustOption(options);
    if (options.offset > 0) {
      options.offset = 0;
    }
  }

  protected adjustItem(item: LabelItem) {
    item.textAlign = 'middle';
  }

  /** @override 不绘制拉线 */
  protected drawLines() {
    return;
  }

  protected layout(labels: IShape[], shapeInfos: LabelItem[]) {
    labels.forEach((label, idx) => {
      if (idx > 0) {
        each(labels.slice(0, idx), (prevLabel) => {
          this.resolveCollision(label, prevLabel, shapeInfos[idx]);
        });
      }
    });
  }

<<<<<<< HEAD
  /** @override 不能大于0 */
  protected getOffsetOfLabel(): number {
    const labelOptions = this.get('labelOptions');
    let offset = labelOptions.offset;
    const radius = this.get('coord').getRadius();
    if (isString(offset)) {
      offset = radius * percent2Number(offset);
    }
    return offset > 0 ? 0 : offset;
=======
  protected getDefaultOptions() {
    const { theme } = this.plot;
    const labelStyle = theme.label.style;
    return {
      offsetX: 0,
      offsetY: 0,
      offset: '-30%',
      style: {
        ...labelStyle,
        textAlign: 'center',
        textBaseline: 'middle',
      },
    };
>>>>>>> 1.x
  }

  /** label 碰撞调整 */
  protected resolveCollision(label: IShape, prev: IShape, shapeInfo: LabelItem): void {
    const { center } = this.getCoordinate();
    const angle = shapeInfo.angle;
    const box = label.getBBox();
    const prevBBox = prev.getBBox();
    const pos = { x: (box.minX + box.maxX) / 2, y: (box.minY + box.maxY) / 2 };
    // 两种调整方案
    /** 先偏移 x 方向 -> 再计算 y 位置 */
    const pos1 = clone(pos);
    /** 先偏移 y 方向 -> 再计算 x 位置 */
    const pos2 = clone(pos);
    // check overlap
    if (prev.get('id') !== label.get('id')) {
      const { xOverlap, yOverlap } = getOverlapInfo(box, prevBBox);
      if (xOverlap) {
        pos1.x = pos.x + xOverlap;
        pos1.y = pos.y + Math.tan(angle) * xOverlap;
      }
      if (yOverlap) {
        // fix issue-460
        let yMover = yOverlap;
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
