import { IShape, BBox } from '../../../../dependents';
import { filter, head, last, map } from '@antv/util';
import PieBaseLabel, { LabelItem, PieLabelConfig } from './base-label';
import { getEndPoint, getOverlapArea, near } from './utils';

// 默认label和element的偏移 16px
export const DEFAULT_OFFSET = 16;

export default class PieOuterLabel extends PieBaseLabel {
  /** @override 不能大于0 */
  protected adjustOption(options: PieLabelConfig) {
    super.adjustOption(options);
    if (options.offset < 0) {
      options.offset = 0;
    }
  }

  protected getDefaultOptions() {
    const { theme } = this.plot;
    const labelStyle = theme.label.style;
    return {
      offsetX: 0,
      offsetY: 0,
      offset: 12,
      style: {
        ...labelStyle,
        textBaseline: 'middle',
      },
    };
  }

  /** label 碰撞调整 */
  protected layout(labels: IShape[], items: LabelItem[], panel: BBox) {
    const { center } = this.getCoordinate();
    const leftHalf = filter(labels, (l) => l.attr('x') <= center.x);
    const rightHalf = filter(labels, (l) => l.attr('x') > center.x);
    [rightHalf, leftHalf].forEach((half, isLeft) => {
      this._antiCollision(half, !isLeft, panel);
    });
    this.adjustOverlap(labels, panel);
  }

  /** 处理标签遮挡问题 */
  protected adjustOverlap(labels: IShape[], panel: BBox): void {
    if (this.options.allowOverlap) {
      return;
    }
    // clearOverlap;
    for (let i = 1; i < labels.length; i++) {
      const label = labels[i];
      let overlapArea = 0;
      for (let j = i - 1; j >= 0; j--) {
        const prev = labels[j];
        // fix: start draw point.x is error when textAlign is right
        const prevBox = prev.getBBox();
        const currBox = label.getBBox();
        // if the previous one is invisible, skip
        if (prev.get('parent').get('visible')) {
          overlapArea = getOverlapArea(prevBox, currBox);
          if (!near(overlapArea, 0)) {
            label.get('parent').set('visible', false);
            break;
          }
        }
      }
    }
    labels.forEach((label) => this.checkInPanel(label, panel));
  }

  /**
   * 超出panel边界的标签默认隐藏
   */
  protected checkInPanel(label: IShape, panel: BBox): void {
    const box = label.getBBox();
    //  横向溢出 暂不隐藏
    if (!(panel.y <= box.y && panel.y + panel.height >= box.y + box.height)) {
      label.get('parent').set('visible', false);
    }
  }

  /** labels 碰撞处理（重点算法） */
  private _antiCollision(labels: IShape[], isRight: boolean, panelBox: BBox) {
    const labelHeight = this.getLabelHeight(labels);
    const { center, radius } = this.getCoordinate();
    const offset = this.options.offset;
    const totalR = radius + offset;
    const totalHeight = Math.min(panelBox.height, Math.max(totalR * 2 + labelHeight * 2, labels.length * labelHeight));
    const maxLabelsCount = Math.floor(totalHeight / labelHeight);
    // fix-bug, maxLabelsCount 之后的labels 在非 allowOverlap 不显示（避免出现尾部label展示，而前置label不展示）
    if (!this.options.allowOverlap) {
      labels.slice(maxLabelsCount).forEach((label) => {
        label.get('parent').set('visible', false);
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
        maxY = Math.min(panelBox.maxY, labelBox.maxY);
      }
      if (labelBox.minY < minY) {
        minY = Math.max(panelBox.minY, labelBox.minY);
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
        const target = last(box.targets);
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
            const target = last(previousBox.targets);
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
    labels.forEach((label, idx) => {
      const anchor = this.arcPoints[idx];
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
      let ry = isBottom ? last(adjustLabels).getBBox().maxY - center.y : center.y - head(adjustLabels).getBBox().minY;
      ry = Math.max(totalR, ry);
      const distance = offset > 4 ? 4 : 0;
      const maxLabelWidth =
        Math.max.apply(
          0,
          map(labels, (label) => label.getBBox().width)
        ) +
        offset +
        distance;
      const rx = Math.max(totalR, Math.min((ry + totalR) / 2, center.x - (panelBox.minX + maxLabelWidth)));
      const rxPow2 = rx * rx;
      const ryPow2 = ry * ry;
      adjustLabels.forEach((label, idx) => {
        const anchor = this.arcPoints[idx];
        const box = label.getBBox();
        const boxCenter = { x: box.minX + box.width / 2, y: box.minY + box.height / 2 };
        const dyPow2 = Math.pow(boxCenter.y - center.y, 2);
        const endPoint = getEndPoint(center, anchor.angle, radius);
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
            // const k1 = (center.y - endPoint.y) / (center.x - endPoint.x);
            // const k2 = (boxCenter.y - endPoint.y) / (xPos - endPoint.x);
            // const theta = Math.atan((k1 - k2) / (1 + k1 * k2));
            // 切角 < 90度（目前的坐标系 无法精准计算切角）
            // if (Math.cos(theta) > 0 && (!isRight ? xPos > endPoint.x : xPos < endPoint.x)) {
            //   xPos = endPoint.x;
            // }
          }
          label.attr('x', xPos + distance_offset);
        }
      });
    });
  }

  /** 获取label height */
  private getLabelHeight(labels: IShape[]): number {
    if (!this.options.labelHeight) {
      return head(labels) ? head(labels).getBBox().height : 14;
    }
    return this.options.labelHeight;
  }
}
