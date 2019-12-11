import Polar from '@antv/coord/lib/coord/polar';
import { BBox, Shape } from '@antv/g';
import { registerElementLabels } from '@antv/g2';
import * as _ from '@antv/util';
import { getEndPoint } from './utils';
import BasePieLabel from './base-label';
import { LabelItem } from '@antv/component/lib/interface';

// 默认label和element的偏移 16px
const DEFAULT_OFFSET = 16;

/**
 * @desc 环绕型 顺时针躲避 label 布局(溢出隐藏)
 */
class OuterPieLabel extends BasePieLabel {
  public adjustPosition(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    this._adjustLabelPosition(labels, items, coord);
    this._antiCollision(labels, items, coord, panel);
  }

  /** @override */
  public adjustLines(labels: Shape[], labelItems: LabelItem[], labelLines: any, coord: Polar, panel: BBox) {
    _.each(labels, (label, idx: number) => {
      const labelLine = labelLines[idx];
      const labelItem = labelItems[idx];
      // 由于布局调整，修改的只是shape 所以取用使用shape(labelItem is read-only)
      const path = this._getLinePath(label, labelItem, coord, panel);
      labelLine.attr('path', path);
      labelLine.set('visible', label.get('visible'));
    });
  }

  // label shape position
  private _adjustLabelPosition(labels: Shape[], items: LabelItem[], coord: Polar) {
    const center = coord.getCenter();
    const r = coord.getRadius();
    labels.forEach((l, idx) => {
      const item = items[idx];
      const offset = this.getOffsetOfLabel(item);
      const pos = getEndPoint(center, item.angle, r + offset);
      l.attr('x', pos.x + (item.textAlign === 'left' ? 12 : -12));
      l.attr('y', pos.y);
      // 统一垂直居中
      l.attr('textBaseline', 'middle');
    });
  }

  private _antiCollision(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    this._adjustRigthTopLabels(labels, items, coord, panel);
    this._adjustRigthBottomLabels(labels, items, coord, panel);
    this._adjustLeftBottomLabels(labels, items, coord, panel);
    this._adjustLeftTopLabels(labels, items, coord, panel);
  }

  /** 调整右上角labels */
  private _adjustRigthTopLabels(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    const center = coord.getCenter();
    const filterLabels = labels.filter((l, idx) => l.attr('textAlign') === 'left' && items[idx].angle < 0);
    const labelHeight = _.head(filterLabels).getBBox().height;
    const offset = this.getOffsetOfLabel(_.head(filterLabels));
    for (let idx = 0; idx < filterLabels.length; idx += 1) {
      const l = filterLabels[idx];
      const box = l.getBBox();
      let xPos = box.x;
      // because label textBaseLine is midlle
      let yPos = (box.minY + box.maxY) / 2;
      const prev = filterLabels[idx - 1];
      let overlapY = 0;
      if (prev) {
        // could not overlap with prev label
        overlapY = Math.max(prev.getBBox().maxY - box.minY, 0);
        if (overlapY) {
          // 判断是否可以后退
          const downFail = !(box.minY - panel.minY > labelHeight * idx);
          if (!downFail) {
            // 回退
            let deltaY = overlapY;
            for (let i = idx - 1; i >= 0; i -= 1) {
              if (!deltaY) break;
              const p = filterLabels[i];
              const pBox = p.getBBox();
              const pYPos = pBox.y + pBox.height / 2 - deltaY;
              p.attr('y', pYPos);
              let pXPos = pBox.x;
              if (coord.getRadius() + offset > center.y - pYPos) {
                pXPos = center.x + Math.sqrt(Math.pow(coord.getRadius() + offset, 2) - Math.pow(center.y - pYPos, 2));
              } else {
                pXPos = filterLabels[i + 1] ? Math.max(filterLabels[i + 1].getBBox().x - deltaY, center.x) : center.x;
              }
              p.attr('x', pXPos);
              if (filterLabels[i - 1]) {
                deltaY = Math.max(filterLabels[i - 1].getBBox().maxY - p.getBBox().minY, 0);
              }
            }
          } else {
            // 否则, 前进
            yPos += overlapY;
            if (coord.getRadius() + offset > center.y - yPos) {
              xPos = center.x + Math.sqrt(Math.pow(coord.getRadius() + offset, 2) - Math.pow(center.y - yPos, 2));
            }
          }
        }
      }
      if (yPos > center.y) break;
      l.attr('x', xPos);
      l.attr('y', yPos);
    }
  }

  /** 调整右下角labels */
  private _adjustRigthBottomLabels(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    const filterLabels = labels.filter((l, idx) => l.attr('textAlign') === 'left' && items[idx].angle >= 0);
    const labelHeight = _.head(filterLabels).getBBox().height;
    const offset = this.getOffsetOfLabel(_.head(filterLabels));
    const center = coord.getCenter();
    const lastRightTopLabel = _.last(labels.filter((l, idx) => l.attr('textAlign') === 'left' && items[idx].angle < 0));
    filterLabels.forEach((l, idx) => {
      const box = l.getBBox();
      let xPos = box.x;
      // because label textBaseLine is midlle
      let yPos = (box.minY + box.maxY) / 2;
      const prev = filterLabels[idx - 1];
      let overlapY = 0;
      if (prev) {
        // could not overlap with prev label
        overlapY = Math.max(prev.getBBox().maxY - box.minY, 0);
        if (overlapY) {
          // 判断是否需要后退 且可以后退
          const down =
            panel.maxY - box.maxY < (filterLabels.length - idx) * labelHeight &&
            box.minY - Math.min(center.y, lastRightTopLabel.getBBox().maxY) > labelHeight * idx;
          if (down) {
            // 回退
            let deltaY = overlapY;
            for (let i = idx - 1; i >= 0; i -= 1) {
              if (!deltaY) break;
              const p = filterLabels[i];
              const pBox = p.getBBox();
              const pYPos = pBox.y + pBox.height / 2 - deltaY;
              p.attr('y', pYPos);
              let pXPos = pBox.x;
              if (coord.getRadius() + offset > pYPos - center.y) {
                pXPos = center.x + Math.sqrt(Math.pow(coord.getRadius() + offset, 2) - Math.pow(pYPos - center.y, 2));
              } else {
                pXPos = filterLabels[i + 1]
                  ? Math.min(filterLabels[i + 1].getBBox().x - pBox.width / 2, center.x)
                  : center.x;
              }
              p.attr('x', pXPos);
              if (filterLabels[i - 1]) {
                deltaY = Math.max(filterLabels[i - 1].getBBox().maxY - p.getBBox().minY, 0);
              }
            }
          } else {
            // 否则, 前进
            yPos += overlapY;
            if (coord.getRadius() + offset > yPos - center.y) {
              xPos = center.x + Math.sqrt(Math.pow(coord.getRadius() + offset, 2) - Math.pow(yPos - center.y, 2));
            }
          }
        }
      }
      l.attr('x', xPos);
      l.attr('y', yPos);
    });
  }

  /** 调整左下角labels */
  private _adjustLeftBottomLabels(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    const center = coord.getCenter();
    const filterLabels = labels.filter(
      (l, idx) => l.attr('textAlign') === 'right' && items[idx].angle >= 0 && items[idx].angle <= Math.PI
    );
    const offset = this.getOffsetOfLabel(_.head(filterLabels));
    const labelHeight = _.head(filterLabels).getBBox().height;
    // filterLabels.forEach((l, idx) => {
    for (let idx = 0; idx < filterLabels.length; idx += 1) {
      const l = filterLabels[idx];
      const box = l.getBBox();
      const prev = filterLabels[idx - 1];
      // because label textBaseLine is midlle
      let yPos = (box.minY + box.maxY) / 2;
      // because label textAlign is right
      let xPos = box.maxX;
      let overlapY = 0;

      if (prev) {
        // could not overlap with prev label
        overlapY = Math.max(box.maxY - prev.getBBox().minY, 0);
        if (overlapY) {
          // 判断是否可以后退
          const downFail = !(panel.maxY - box.maxY > labelHeight * idx);
          if (!downFail) {
            // 后退
            let deltaY = overlapY;
            for (let i = idx - 1; i >= 0; i -= 1) {
              if (!deltaY) break;
              const p = filterLabels[i];
              const pBox = p.getBBox();
              const pYPos = pBox.y + pBox.height / 2 + deltaY;
              p.attr('y', pYPos);
              let pXPos = pBox.x;
              if (coord.getRadius() + offset > pYPos - center.y) {
                pXPos = center.x - Math.sqrt(Math.pow(coord.getRadius() + offset, 2) - Math.pow(pYPos - center.y, 2));
              } else {
                pXPos = filterLabels[i + 1]
                  ? Math.min(filterLabels[i + 1].getBBox().maxX + pBox.width / 2, center.x - pBox.width / 2)
                  : center.x - pBox.width / 2;
              }
              p.attr('x', pXPos);
              if (filterLabels[i - 1]) {
                deltaY = Math.max(p.getBBox().maxY - filterLabels[i - 1].getBBox().minY, 0);
              }
            }
          } else {
            // 否则, 前进
            yPos -= overlapY;
            if (coord.getRadius() + offset > yPos - center.y) {
              xPos = center.x - Math.sqrt(Math.pow(coord.getRadius() + offset, 2) - Math.pow(yPos - center.y, 2));
            }
          }
        }
      }
      if (yPos < center.y) break;
      l.attr('x', xPos);
      l.attr('y', yPos);
    }
  }

  /** 调整左上角labels */
  private _adjustLeftTopLabels(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    const center = coord.getCenter();
    // fix, angle maybe larger than Math.PI
    const filterLabels = labels.filter(
      (l, idx) => l.attr('textAlign') === 'right' && (items[idx].angle < 0 || items[idx].angle > Math.PI)
    );
    const labelHeight = _.head(filterLabels).getBBox().height;
    const offset = this.getOffsetOfLabel(_.head(filterLabels));
    const lastLeftBottomLabel = _.last(
      labels.filter((l, idx) => l.attr('textAlign') === 'right' && items[idx].angle >= 0 && items[idx].angle <= Math.PI)
    );
    // 椭圆的短半轴rx 和 长半轴ry
    filterLabels.forEach((label, idx) => {
      const box = label.getBBox();
      let yPos = (box.minY + box.maxY) / 2;
      let xPos = box.maxX;
      const prev = filterLabels[idx - 1] || lastLeftBottomLabel;
      // could not overlap with prev label
      const overlapY = Math.max(box.maxY - prev.getBBox().minY, 0);
      if (overlapY) {
        // 判断是否需要回退 且可以回退
        const down =
          box.maxY - panel.minY < labelHeight * (filterLabels.length - idx) &&
          Math.min(center.y, lastLeftBottomLabel.getBBox().minY) - box.maxY > labelHeight * idx;
        if (down) {
          // 回退
          let deltaY = overlapY;
          for (let i = idx - 1; i >= 0; i -= 1) {
            if (!deltaY) break;
            const p = filterLabels[i];
            const pBox = p.getBBox();
            const pYPos = pBox.y + pBox.height / 2 + deltaY;
            p.attr('y', pYPos);
            let pXPos = pBox.x;
            if (coord.getRadius() + offset > center.y - pYPos) {
              pXPos = center.x - Math.sqrt(Math.pow(coord.getRadius() + offset, 2) - Math.pow(center.y - pYPos, 2));
            } else {
              pXPos = filterLabels[i + 1] ? Math.min(filterLabels[i + 1].getBBox().maxX, center.x) : center.x;
            }
            p.attr('x', pXPos);
            if (filterLabels[i - 1]) {
              deltaY = Math.max(p.getBBox().maxY - filterLabels[i - 1].getBBox().minY, 0);
            }
          }
        } else {
          // 否则, 前进
          yPos -= overlapY;
          if (coord.getRadius() + offset > center.y - yPos) {
            xPos = center.x - Math.sqrt(Math.pow(coord.getRadius() + offset, 2) - Math.pow(center.y - yPos, 2));
          }
        }
      }

      label.attr('x', xPos);
      label.attr('y', yPos);
    });
  }

  // 获取label leader-line
  private _getLinePath(label: Shape, item: LabelItem, coord: Polar, panel: BBox): string {
    let path = '';
    const angle = item.angle;
    const center = coord.getCenter();
    const r = coord.getRadius();
    const start = getEndPoint(center, angle, r);
    const end = { x: label.attr('x') - (item.textAlign === 'left' ? 4 : -4), y: label.attr('y') };
    const offset = this.getOffsetOfLabel(item);
    const alignment = item.textAlign;
    const breakAt = getEndPoint(center, angle, r + offset);
    breakAt.x = alignment === 'left' ? Math.min(breakAt.x, end.x) : Math.max(breakAt.x, end.x);
    path = [`M ${start.x}`, `${start.y} Q${breakAt.x}`, `${breakAt.y} ${end.x}`, end.y].join(',');
    return path;
  }

  /** 获取label offset, 默认 16px 不允许 <= 0 */
  private getOffsetOfLabel(labelItem: LabelItem): number {
    // @ts-ignore
    const offset = (labelItem && labelItem.offset) || DEFAULT_OFFSET;
    return offset > 0 ? offset : 1;
  }
}

registerElementLabels('outer', OuterPieLabel);
