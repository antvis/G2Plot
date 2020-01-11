import Polar from '@antv/coord/lib/coord/polar';
import { BBox, Shape } from '@antv/g';
import { registerElementLabels } from '@antv/g2';
import { LabelItem } from '@antv/component/lib/interface';
import * as _ from '@antv/util';
import { getEndPoint } from './utils';
import BaseLabel, { LabelData } from './base-label';
import { getEllipsisText } from './utils/text';
import { DEFAULT_OFFSET, CROOK_DISTANCE } from './outer-label';

const ADJUST_OFFSET = 15;

/**
 * @param reverse 默认false，自上而下 迭代boxes
 */
const iteratorBoxes = (boxes: any[], maxY: number, minY: number) => {
  // adjust y position of labels to avoid overlapping
  const boxesCount = boxes.length;
  let j = 0;
  while (j < boxesCount - 1) {
    boxes[j].targets[0] = boxes[j + 1].pos;
    j++;
  }
  boxes[boxesCount - 1].targets[0] = maxY;
  let overlapping = true;
  while (overlapping) {
    boxes.forEach((box) => {
      const target = _.last(box.targets);
      box.pos = Math.max(minY, Math.min(box.pos, target - box.size));
    });
    // detect overlapping and join boxes
    overlapping = false;
    let i = boxes.length;
    while (i--) {
      if (i > 0) {
        const previousBox = boxes[i - 1];
        const box = boxes[i];
        const boxTarget = _.last(box.targets);
        if (previousBox.pos + previousBox.size > box.pos) {
          // overlapping
          previousBox.size += box.size;
          previousBox.targets = previousBox.targets.concat(box.targets);
          // overflow, shift up
          const target = _.last(previousBox.targets);
          if (previousBox.pos + previousBox.size > target) {
            previousBox.pos = target - previousBox.size;
          }
          boxes.splice(i, 1); // removing box
          overlapping = true;
        } else {
          // 换掉最后一个
          previousBox.targets.splice(-1, 1, boxTarget - box.size);
        }
      }
    }
  }
};

/**
 * @desc 环绕型 躲避 label 布局(类椭圆 - 优先顺时针偏移)
 */
class SpiderPieLabel extends BaseLabel {
  public adjustPosition(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    this._adjustLabelPosition(labels, coord, panel);
    const leftHalf = _.filter(labels, (l) => _.find(this.anchors, (a) => a.id === l.id).textAlign === 'right');
    const rightHalf = _.filter(labels, (l) => _.find(this.anchors, (a) => a.id === l.id).textAlign === 'left');
    [rightHalf, leftHalf].forEach((half) => {
      this._antiCollision(half, coord, panel);
    });
  }

  /** @override */
  public adjustLines(labels: Shape[], labelItems: LabelItem[], labelLines: any, coord: Polar, panel: BBox) {
    const style: any = this.getLabelOptions().style;
    _.each(labels, (label, idx: number) => {
      const labelLine = labelLines[idx];
      // 由于布局调整，修改的只是shape 所以取用使用shape(labelItem is read-only)
      const path = this._getLinePath(label, coord, panel);
      labelLine.attr('path', path);
      labelLine.attr('lineWidth', style.lineWidth);
      labelLine.attr('stroke', style.lineStroke);
      labelLine.set('visible', label.get('visible'));
    });
  }

  /** @override */
  protected getOffsetOfLabel(): number {
    const labelOptions = this.getLabelOptions();
    const offset = labelOptions.offset;
    return offset === undefined ? DEFAULT_OFFSET : offset < CROOK_DISTANCE * 2 ? offset / 2 : offset - CROOK_DISTANCE;
  }

  /** @override 调整 label text */
  protected adjustLabelText(label: Shape, item: LabelItem, coord: Polar, panel: BBox) {
    const box = label.getBBox();
    let maxWidth;
    const anchor = this.anchors.find((a) => a.id === label.id);
    const isLeft = anchor.x < coord.getCenter().x;
    const alignTo = this.getLabelAlignTo();
    if (alignTo === 'edge') {
      maxWidth = isLeft ? anchor.x - label.getBBox().minX : label.getBBox().maxX - anchor.x;
    } else {
      maxWidth = isLeft ? box.maxX - panel.minX : panel.maxX - box.minX;
    }
    if (maxWidth < box.width) {
      const font = {
        fontFamily: label.attr('fontFamily'),
        fontSize: label.attr('fontSize'),
        fontVariant: label.attr('fontVariant'),
        fontWeight: label.attr('fontWeight'),
        fontStyle: label.attr('fontStyle'),
      };
      const originText = label.attr('text');
      const data: LabelData = label.attr('data');
      /** label 优先级: 数值 - 百分比 - 分类名(先通过正则的方式处理) */
      const priority = ['[\\d,.]*', '[\\d.]*%', data.name];
      const EllipsisTextArr = originText.split('\n').map((t) => getEllipsisText(t, maxWidth - 2, font, priority));
      label.attr('text', EllipsisTextArr.join('\n'));
    }
  }

  /** spider-labels 碰撞处理（重点算法） */
  private _antiCollision(labels: Shape[], coord: Polar, plotRange: BBox) {
    const labelHeight = this.getLabelHeight();
    const totalR = this.anchorRadius;
    const center = coord.getCenter();
    const totalHeight = Math.min(plotRange.height, Math.max(totalR * 2 + labelHeight * 2, labels.length * labelHeight));
    const maxLabelsCount = Math.floor(totalHeight / labelHeight);

    labels.splice(maxLabelsCount, labels.length - maxLabelsCount);
    // sort by y DESC
    labels.sort((a, b) => a.getBBox().y - b.getBBox().y);
    let maxY = center.y + totalHeight / 2;
    let minY = center.y - totalHeight / 2;
    const boxes = labels.map((label) => {
      const labelBox = label.getBBox();
      const yPos = (labelBox.minY + labelBox.maxY) / 2 - labelHeight / 2;
      if (yPos + labelHeight > maxY) {
        maxY = Math.min(plotRange.maxY, yPos + labelHeight);
      }
      if (yPos < minY) {
        minY = Math.max(plotRange.minY, yPos);
      }
      return {
        text: label.attr('text'),
        size: labelHeight,
        pos: yPos,
        targets: [],
      };
    });
    iteratorBoxes(boxes, maxY, minY);
    let i = 0;
    // step 4: normalize y and adjust x
    boxes.forEach((b) => {
      let posInCompositeBox = labelHeight / 2; // middle of the label
      b.targets.forEach(() => {
        labels[i].attr('y', b.pos + posInCompositeBox);
        posInCompositeBox += labelHeight;
        i++;
      });
    });
  }

  // label shape position
  private _adjustLabelPosition(labels: Shape[], coord: Polar, panel: BBox) {
    const distance = this.getCrookDistance();
    const offset = this.getOffsetOfLabel();
    const alignTo = this.getLabelAlignTo();
    const center = coord.getCenter();
    const radius = coord.getRadius();
    labels.forEach((l) => {
      const anchor = this.anchors.find((a) => a.id === l.id);
      const isRight = anchor.x >= center.x;
      let xPos;
      if (alignTo === 'edge') {
        xPos = isRight ? panel.maxX - offset : panel.minX + offset;
        l.attr('textAlign', isRight ? 'right' : 'left');
      } else {
        const offsetX = radius + offset + distance * 2;
        xPos = isRight ? center.x + offsetX : center.x - offsetX;
        l.attr('textAlign', isRight ? 'left' : 'right');
      }
      l.attr('x', xPos);
      l.attr('y', anchor.y);
    });
  }

  /** 获取label leader-line */
  private _getLinePath(label: Shape, coord: Polar, panel: BBox): string {
    const anchor = this.anchors.find((a) => a.id === label.id);
    const angle = anchor.angle;
    const center = coord.getCenter();
    const distance = this.getCrookDistance();
    const alignTo = this.getLabelAlignTo();
    const start = getEndPoint(center, angle, coord.getRadius());
    const isRight = anchor.x >= center.x;
    /** 拐点 */
    const breakAt = { x: anchor.x, y: anchor.y };
    const end = { x: null, y: label.attr('y') };
    if (alignTo === 'edge') {
      const labelBBox = label.getBBox();
      end.x = isRight ? Math.max(breakAt.x, labelBBox.minX - distance) : Math.min(breakAt.x, labelBBox.maxX + distance);
    } else {
      end.x = label.attr('x') + (isRight ? -distance : distance);
    }
    let straightPath = ['L', breakAt.x, breakAt.y];
    // situation 1: 标签发生偏移时，拉线需要增加第二拐点（以下两种场景需要添加第二拐点，其他场景进行拐点偏移）
    if ((center.y > start.y && end.y > breakAt.y) || (center.y < start.y && end.y < breakAt.y)) {
      /** 标签起点在圆心上方，发生向下偏移 */
      const dx = Math.abs(end.x - breakAt.x);
      const dy = Math.abs(end.y - breakAt.y);
      /** 降低拐点的偏移斜率 */
      const adjust_offset = Math.min(dx / 3, Math.max(ADJUST_OFFSET, dy / Math.tan(Math.PI / 8)));
      const breakAt1 = breakAt.x + (isRight ? adjust_offset : -adjust_offset);
      const breakAt2 = breakAt1 + (isRight ? adjust_offset : -adjust_offset);
      straightPath = ['L', breakAt.x, breakAt.y, 'L', breakAt1, breakAt.y, 'L', breakAt2, end.y];
    } else if (end.y !== breakAt.y) {
      straightPath = ['L', breakAt.x, end.y];
    }
    // situation 2: 拉线不可以与图形重叠 TODO
    const path = ['M', start.x, start.y].concat(straightPath).concat(['L', end.x, end.y]);
    return path.join(',');
  }

  private getCrookDistance(): number {
    const labelOptions = this.get('labelOptions');
    const offset = labelOptions.offset;
    return offset < CROOK_DISTANCE * 2 ? offset / 2 : CROOK_DISTANCE;
  }

  /** 获取label height */
  private getLabelHeight(): number {
    const labelOptions = this.get('labelOptions');
    if (!labelOptions.labelHeight) {
      const renderer = this.get('labelsRenderer');
      const labels: Shape[] = renderer.get('group').get('children');
      // label 之间垂直间距默认 8px
      return _.head(labels) ? _.head(labels).getBBox().height + 8 : 14;
    }
    return labelOptions.labelHeight;
  }

  private getLabelAlignTo(): string {
    const labelOptions = this.get('labelOptions');
    const panel = this.get('element')
      .get('view')
      .get('panelRange');
    if (!labelOptions.alignTo) {
      return panel.width > 375 ? 'label-line' : 'edge';
    }
    return labelOptions.alignTo;
  }

  // tslint:disable
  public getDefaultOffset(point) {
    const offset = super.getDefaultOffset(point);
    return offset === undefined ? DEFAULT_OFFSET : offset <= CROOK_DISTANCE ? 1 : offset - CROOK_DISTANCE;
  }
}

registerElementLabels('spider', SpiderPieLabel);
