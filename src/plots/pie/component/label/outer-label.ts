import Polar from '@antv/coord/lib/coord/polar';
import { BBox, Shape } from '@antv/g';
import { registerElementLabels } from '@antv/g2';
import { LabelItem } from '@antv/component/lib/interface';
import * as _ from '@antv/util';
import { getEndPoint } from './utils';
import BaseLabel from './base-label';

// 默认label和element的偏移 16px
export const DEFAULT_OFFSET = 16;
/** label text和line距离 4px */
export const CROOK_DISTANCE = 4;

/**
 * @desc 环绕型 躲避 label 布局(类椭圆 - 优先顺时针偏移)
 */
class OuterPieLabel extends BaseLabel {
  public adjustPosition(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    this._adjustLabelPosition(labels, coord, panel);
    const leftHalf = _.filter(labels, (l) => _.find(this.anchors, (a) => a.id === l.id).textAlign === 'right');
    const rightHalf = _.filter(labels, (l) => _.find(this.anchors, (a) => a.id === l.id).textAlign === 'left');
    [rightHalf, leftHalf].forEach((half, isLeft) => {
      this._antiCollision(half, coord, panel, !isLeft);
    });
  }

  /** @override */
  public adjustLines(labels: Shape[], labelItems: LabelItem[], labelLines: any, coord: Polar, panel: BBox) {
    _.each(labels, (label, idx: number) => {
      const labelLine = labelLines[idx];
      // 由于布局调整，修改的只是shape 所以取用使用shape(labelItem is read-only)
      const path = this._getLinePath(label, coord, panel);
      labelLine.attr('path', path);
      labelLine.set('visible', label.get('visible'));
    });
  }

  /** override */
  protected getOffsetOfLabel(): number {
    const labelOptions = this.getLabelOptions();
    const offset = labelOptions.offset;
    return offset === undefined ? DEFAULT_OFFSET : offset < CROOK_DISTANCE * 2 ? offset / 2 : offset - CROOK_DISTANCE;
  }

  /** labels 碰撞处理（重点算法） */
  private _antiCollision(labels: Shape[], coord: Polar, plotRange: BBox, isRight: boolean) {
    const labelHeight = this.getLabelHeight();
    const totalR = this.anchorRadius;
    const center = coord.getCenter();
    const totalHeight = Math.min(plotRange.height, Math.max(totalR * 2 + labelHeight * 2, labels.length * labelHeight));
    const maxLabelsCount = Math.floor(totalHeight / labelHeight);
    // fix-bug, maxLabelsCount 之后的labels 在非 allowOverlap 不显示（避免出现尾部label展示，而前置label不展示）
    if (!this.get('labelOptions').allowOverlap) {
      labels.slice(maxLabelsCount).forEach((label) => {
        label.set('visible', false);
      });
    }
    labels.splice(maxLabelsCount, labels.length - maxLabelsCount);

    // sort by y DESC
    labels.sort((a, b) => a.getBBox().y - b.getBBox().y);
    // adjust y position of labels to avoid overlapping
    let overlapping = true;
    let i;
    let maxY = center.y + totalHeight / 2;
    let minY = center.y - totalHeight / 2;
    const boxes = labels.map((label) => {
      const labelBox = label.getBBox();
      if (labelBox.maxY > maxY) {
        maxY = Math.min(plotRange.maxY, labelBox.maxY);
      }
      if (labelBox.minY < minY) {
        minY = Math.max(plotRange.minY, labelBox.minY);
      }
      return {
        text: label.attr('text'),
        size: labelHeight,
        pos: labelBox.y,
        targets: [],
      };
    });
    let j = 0;
    while (j < boxes.length) {
      if (j === boxes.length - 1) {
        boxes[j].targets[0] = maxY;
      } else {
        boxes[j].targets[0] = boxes[j + 1].pos - boxes[j + 1].size / 2;
      }
      j++;
    }
    while (overlapping) {
      boxes.forEach((box) => {
        const target = _.last(box.targets);
        box.pos = Math.max(minY, Math.min(box.pos, target - box.size));
      });
      // detect overlapping and join boxes
      overlapping = false;
      i = boxes.length;
      while (i--) {
        if (i > 0) {
          const previousBox = boxes[i - 1];
          const box = boxes[i];
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
            previousBox.targets.splice(-1, 1, box.pos);
          }
        }
      }
    }

    i = 0;
    // step 4: normalize y and adjust x
    boxes.forEach((b) => {
      let posInCompositeBox = labelHeight / 2; // middle of the label
      b.targets.forEach(() => {
        labels[i].attr('y', b.pos + posInCompositeBox);
        posInCompositeBox += labelHeight;
        i++;
      });
    });

    // 调整 x 位置在椭圆轨道上
    const topLabels = [];
    const bottomLabels = [];
    labels.forEach((label) => {
      const anchor = this.anchors.find((a) => a.id === label.id);
      if (anchor.angle >= 0 && anchor.angle <= Math.PI) {
        bottomLabels.push(label);
      } else {
        topLabels.push(label);
      }
    });
    [topLabels, bottomLabels].forEach((adjustLabels, isBottom) => {
      if (!adjustLabels.length) {
        return;
      }
      let ry = isBottom
        ? _.last(adjustLabels).getBBox().maxY - center.y
        : center.y - _.head(adjustLabels).getBBox().minY;
      ry = Math.max(totalR, ry);
      const offset = this.getOffsetOfLabel();
      const distance = this.getCrookDistance();
      const maxLabelWidth =
        Math.max.apply(
          0,
          _.map(labels, (label) => label.getBBox().width)
        ) +
        offset +
        distance;
      const rx = Math.max(totalR, Math.min((ry + totalR) / 2, center.x - (plotRange.minX + maxLabelWidth)));
      const rxPow2 = rx * rx;
      const ryPow2 = ry * ry;
      adjustLabels.forEach((label) => {
        const box = label.getBBox();
        const boxCenter = { x: box.minX + box.width / 2, y: box.minY + box.height / 2 };
        const dyPow2 = Math.pow(boxCenter.y - center.y, 2);
        const anchor = this.anchors.find((a) => a.id === label.id);
        const endPoint = getEndPoint(center, anchor.angle, coord.getRadius());
        const distance_offset = (isRight ? 1 : -1) * distance * 2;
        if (dyPow2 > ryPow2) {
          console.warn('异常(一般不会出现)', label.attr('text'));
          label.attr('x', endPoint.x + distance_offset);
        } else {
          // (x - cx)^2 / rx ^ 2 + (y - cy)^2 / ry ^ 2 = 1
          // 避免 label的 拉线 在 element 上
          let xPos = center.x + (isRight ? 1 : -1) * Math.sqrt((1 - dyPow2 / ryPow2) * rxPow2);
          if (
            (center.x === endPoint.x && boxCenter.y === endPoint.y) ||
            (center.y === endPoint.y && xPos === endPoint.x)
          ) {
            xPos = endPoint.x;
          } else {
            const k1 = (center.y - endPoint.y) / (center.x - endPoint.x);
            const k2 = (boxCenter.y - endPoint.y) / (xPos - endPoint.x);
            const theta = Math.atan((k1 - k2) / (1 + k1 * k2));
            if (Math.cos(theta) > 0 && (!isRight ? xPos > endPoint.x : xPos < endPoint.x)) {
              xPos = endPoint.x;
            }
          }
          label.attr('x', xPos + distance_offset);
        }
      });
    });
  }

  // label shape position
  private _adjustLabelPosition(labels: Shape[], coord: Polar, panel: BBox) {
    const distance = this.getCrookDistance();
    labels.forEach((l) => {
      const anchor = this.anchors.find((a) => a.id === l.id);
      const isRight = anchor.textAlign === 'left';
      l.attr('x', anchor.x + (isRight ? distance * 2 : -distance * 2));
      l.attr('y', anchor.y);
      // 统一垂直居中
      l.attr('textBaseline', 'middle');
    });
  }

  /** 获取label leader-line, 默认 not smooth */
  private _getLinePath(label: Shape, coord: Polar, panel: BBox): string {
    const labelOptions = this.getLabelOptions();
    const smooth = labelOptions.line ? labelOptions.line.smooth : false;
    const anchor = this.anchors.find((a) => a.id === label.id);
    const angle = anchor.angle;
    const center = coord.getCenter();
    const distance = this.getCrookDistance();
    const start = getEndPoint(center, angle, coord.getRadius());
    const isRight = anchor.textAlign === 'left';
    let breakAt = anchor;
    const end = { x: label.attr('x') + (isRight ? -distance : distance), y: label.attr('y') };
    let smoothPath = [];
    if (end.y < anchor.y) {
      breakAt = {
        ...breakAt,
        id: breakAt.id,
        y: end.y,
        x: end.x + (start.x - breakAt.x),
      };
    }
    smoothPath = smoothPath.concat(['Q', breakAt.x, breakAt.y]).concat([end.x, end.y]);
    const straightPath = ['L', /** pointy break */ breakAt.x, breakAt.y].concat(['L', end.x, end.y]);
    const linePath = smooth ? smoothPath : straightPath;
    const path = ['M', start.x, start.y].concat(linePath);

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
      return _.head(labels) ? _.head(labels).getBBox().height : 14;
    }
    return labelOptions.labelHeight;
  }

  // tslint:disable
  public getDefaultOffset(point) {
    const offset = super.getDefaultOffset(point);
    return offset === undefined ? DEFAULT_OFFSET : offset <= CROOK_DISTANCE ? 1 : offset - CROOK_DISTANCE;
  }
}

registerElementLabels('outer', OuterPieLabel);
