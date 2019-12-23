import Polar from '@antv/coord/lib/coord/polar';
import { BBox, Shape } from '@antv/g';
import { registerElementLabels } from '@antv/g2';
import * as _ from '@antv/util';
import { getEndPoint } from './utils';
import BasePieLabel from './base-label';
import { LabelItem } from '@antv/component/lib/interface';

// 默认label和element的偏移 16px
const DEFAULT_OFFSET = 16;
/** label text和line距离 4px */
const CROOK_DISTANCE = 4;

/**
 * @desc 环绕型 顺时针躲避 label 布局(溢出隐藏)
 */
class OuterPieLabel extends BasePieLabel {
  public adjustPosition(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    this._adjustLabelPosition(labels, items, coord, panel);
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
  private _adjustLabelPosition(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    const center = coord.getCenter();
    const r = coord.getRadius();
    const distance = this.getCrookDistance();
    labels.forEach((l, idx) => {
      const item = items[idx];
      const offset = this.getOffsetOfLabel();
      const pos = getEndPoint(center, item.angle, r + offset);
      const isRight = item.textAlign === 'left';
      l.attr('x', pos.x + (isRight ? distance * 2 : -distance * 2));
      l.attr('y', pos.y);
      // 统一垂直居中
      l.attr('textBaseline', 'middle');
    });
    // OPTIMIZE start
    /** all labels move into panel */
    labels.forEach((l) => this.moveYIntoPanel(l, panel));
    // OPTIMIZE end
  }

  /** 防止label溢出  */
  private moveYIntoPanel(label: Shape, panel: BBox): void {
    const box = label.getBBox();
    if (box.y < panel.y) {
      label.attr('y', panel.y + box.height / 2);
    } else if (box.maxY > panel.maxY) {
      label.attr('y', panel.maxY - box.height / 2);
    }
  }

  private _antiCollision(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    this._adjustRigthTopLabels(labels, items, coord, panel);
    this._adjustRigthBottomLabels(labels, items, coord, panel);
    this._adjustLeftBottomLabels(labels, items, coord, panel);
    this._adjustLeftTopLabels(labels, items, coord, panel);
  }

  /** 调整右上角labels */
  private _adjustRigthTopLabels(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    const margin = 2;
    const center = coord.getCenter();
    const r = coord.getRadius();
    const filterLabels = labels.filter((l, idx) => l.attr('textAlign') === 'left' && items[idx].angle < 0);
    if (!filterLabels.length) return;
    const labelHeight = _.head(filterLabels).getBBox().height + margin;
    const offset = this.getOffsetOfLabel();
    const rx = r + offset;
    /** usableLabels box  */
    const groupBox = {
      minX: center.x,
      maxX: panel.maxX,
      minY: panel.minY,
      maxY: center.y,
    };
    // 计算可用高度
    const usableHeight = groupBox.maxY - groupBox.minY;
    const usableCount = Math.min(filterLabels.length, usableHeight / labelHeight);
    if (!usableCount) return;
    const usableLabels = filterLabels.slice(0, usableCount);
    for (let idx = 0; idx < usableLabels.length; idx += 1) {
      const label = usableLabels[idx];
      const box = label.getBBox();
      let moved = false;
      // 剩余空间不足,或 overlaped with previous label
      if (idx === 0 && box.minY < groupBox.minY) {
        label.attr('y', groupBox.minY + labelHeight / 2);
        moved = true;
      } else if (idx > 0 && box.minY < usableLabels[idx - 1].getBBox().maxY) {
        const yPos = usableLabels[idx - 1].getBBox().maxY + labelHeight / 2;
        label.attr('y', yPos);
        moved = true;
      } else if (groupBox.maxY - box.maxY < (usableCount - (idx + 1)) * labelHeight) {
        const yPos = groupBox.maxY - (usableCount - (idx + 1)) * labelHeight - labelHeight / 2;
        label.attr('y', yPos);
        moved = true;
      }
      label.attr('moved', moved);
    }

    const ry = Math.max(center.y - _.head(usableLabels).getBBox().minY, usableCount * labelHeight);
    for (let idx = 0; idx < usableLabels.length; idx += 1) {
      const label = usableLabels[idx];
      if (label.attr('moved')) {
        const box = label.getBBox();
        const ryPow2 = ry * ry;
        const rxPow2 = rx * rx;
        const dyPow2 = Math.pow(Math.abs(box.y - center.y), 2);
        // (x - cx)^2 / rx ^ 2 + (y - cy)^2 / ry ^ 2 = 1
        let xPos = center.x + Math.sqrt((1 - dyPow2 / ryPow2) * rxPow2);
        const itemIdx = _.findIndex(items, (item) => item.id === label.id);
        const dAngle = (items[itemIdx + 1] ? items[itemIdx + 1].angle : -Math.PI / 2) - items[itemIdx].angle;
        // L=n× π× r/180
        xPos = Math.max(xPos, center.x + dAngle * r);
        label.attr('x', xPos);
      }
    }
  }

  /** 调整右下角labels */
  private _adjustRigthBottomLabels(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    const margin = 2;
    const filterLabels = labels.filter((l, idx) => l.attr('textAlign') === 'left' && items[idx].angle >= 0);
    if (!filterLabels.length) return;
    const center = coord.getCenter();
    const r = coord.getRadius();
    const offset = this.getOffsetOfLabel();
    const labelHeight = _.head(filterLabels).getBBox().height + margin;
    const originIdx = _.findIndex(labels, (l) => l.id === _.head(filterLabels).id);
    const rx = r + offset;
    /** usableLabels box  */
    const groupBox = {
      minX: center.x,
      maxX: panel.maxX,
      minY: Math.min(center.y, labels[originIdx - 1] ? labels[originIdx - 1].getBBox().maxY : Infinity),
      maxY: panel.maxY,
    };
    // 计算可用高度
    const usableHeight = groupBox.maxY - groupBox.minY;
    const usableCount = Math.min(filterLabels.length, usableHeight / labelHeight);
    if (!usableCount) return;
    const usableLabels = filterLabels.slice(0, usableCount);
    for (let idx = 0; idx < usableLabels.length; idx += 1) {
      const label = usableLabels[idx];
      const box = label.getBBox();
      let moved = false;
      // 剩余空间不足,或 overlaped with previous label
      if (idx === 0 && box.minY < groupBox.minY) {
        label.attr('y', groupBox.minY + labelHeight / 2);
        moved = true;
      } else if (idx > 0 && box.minY < usableLabels[idx - 1].getBBox().maxY) {
        // could not overlaped with previous label
        const yPos = usableLabels[idx - 1].getBBox().maxY + labelHeight / 2;
        label.attr('y', yPos);
        moved = true;
      } else if (groupBox.maxY - box.maxY < (usableCount - (idx + 1)) * labelHeight) {
        const yPos = groupBox.maxY - (usableCount - (idx + 1)) * labelHeight - labelHeight / 2;
        label.attr('y', yPos);
        moved = true;
      }
      label.attr('moved', moved);
    }

    const ry = Math.max(_.last(usableLabels).getBBox().maxY - center.y, usableCount * labelHeight);
    for (let idx = 0; idx < usableLabels.length; idx += 1) {
      const label = usableLabels[idx];
      if (label.attr('moved')) {
        const box = label.getBBox();
        const ryPow2 = ry * ry;
        const rxPow2 = rx * rx;
        const dyPow2 = Math.pow(Math.abs(box.y - center.y), 2);
        // (x - cx)^2 / rx ^ 2 + (y - cy)^2 / ry ^ 2 = 1
        let xPos = center.x + Math.sqrt((1 - dyPow2 / ryPow2) * rxPow2);
        const itemIdx = _.findIndex(items, (item) => item.id === label.id);
        const dAngle = (items[itemIdx + 1] ? items[itemIdx + 1].angle : -Math.PI / 2) - items[itemIdx].angle;
        // L=n× π× r/180
        xPos = Math.max(xPos, center.x + dAngle * r);
        label.attr('x', xPos);
      }
    }
  }

  /** 调整左下角labels */
  private _adjustLeftBottomLabels(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    const margin = 2;
    const center = coord.getCenter();
    const r = coord.getRadius();
    const filterLabels = labels.filter(
      (l, idx) => l.attr('textAlign') === 'right' && items[idx].angle >= 0 && items[idx].angle <= Math.PI
    );
    if (!filterLabels.length) return;
    const offset = this.getOffsetOfLabel();
    const labelHeight = _.head(filterLabels).getBBox().height + margin;
    const rx = r + offset;
    /** usableLabels box  */
    const groupBox = {
      minX: panel.minX,
      maxX: center.x,
      minY: center.y,
      maxY: panel.maxY,
    };
    // 计算可用高度
    const usableHeight = groupBox.maxY - groupBox.minY;
    const usableCount = Math.min(filterLabels.length, usableHeight / labelHeight);
    if (!usableCount) return;
    const usableLabels = filterLabels.slice(0, usableCount);
    usableLabels.forEach((label, idx) => {
      const box = label.getBBox();
      let moved = false;
      // 剩余空间不足,或 overlaped with previous label
      if (idx > 0 && box.maxY > usableLabels[idx - 1].getBBox().minY) {
        const yPos = usableLabels[idx - 1].getBBox().minY - labelHeight / 2;
        label.attr('y', yPos);
        moved = true;
      } else if (box.minY - groupBox.minY < (usableCount - (idx + 1)) * labelHeight) {
        // enough space for remained labels
        const newMinY = groupBox.minY + (usableCount - (idx + 1)) * labelHeight;
        label.attr('y', newMinY + labelHeight / 2);
        moved = true;
      }
      label.attr('moved', moved);
    });
    const ry = Math.max(_.head(usableLabels).getBBox().maxY - center.y, usableCount * labelHeight);
    for (let idx = 0; idx < usableLabels.length; idx += 1) {
      const label = usableLabels[idx];
      if (label.attr('moved')) {
        const box = label.getBBox();
        const ryPow2 = ry * ry;
        const rxPow2 = rx * rx;
        const dyPow2 = Math.pow(Math.abs(box.y - center.y), 2);
        // (x - cx)^2 / rx ^ 2 + (y - cy)^2 / ry ^ 2 = 1
        let xPos = center.x - Math.sqrt((1 - dyPow2 / ryPow2) * rxPow2);
        const itemIdx = _.findIndex(items, (item) => item.id === label.id);
        const dAngle = (items[itemIdx + 1] ? items[itemIdx + 1].angle : -Math.PI / 2) - items[itemIdx].angle;
        // L=n× π× r/180
        xPos = Math.min(xPos, center.x - dAngle * r);
        label.attr('x', xPos);
      }
    }
  }

  /** 调整左上角labels */
  private _adjustLeftTopLabels(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    const margin = 2;
    const center = coord.getCenter();
    const r = coord.getRadius();
    // fix, angle maybe larger than Math.PI
    const filterLabels = labels.filter(
      (l, idx) => l.attr('textAlign') === 'right' && (items[idx].angle < 0 || items[idx].angle > Math.PI)
    );
    if (!filterLabels.length) return;
    const labelHeight = _.head(filterLabels).getBBox().height + margin;
    const offset = this.getOffsetOfLabel();
    const originIdx = _.findIndex(labels, (l) => l.id === _.head(filterLabels).id);
    const rx = r + offset;
    /** usableLabels box  */
    const groupBox = {
      minX: panel.minX,
      maxX: center.x,
      minY: panel.minY,
      maxY: Math.min(center.y, labels[originIdx - 1] ? labels[originIdx - 1].getBBox().minY : Infinity),
    };
    // 计算可用高度
    const usableHeight = groupBox.maxY - groupBox.minY;
    const usableCount = Math.min(filterLabels.length, usableHeight / labelHeight);
    if (!usableCount) return;
    const usableLabels = filterLabels.slice(0, usableCount);
    for (let idx = 0; idx < usableLabels.length; idx += 1) {
      const label = usableLabels[idx];
      const box = label.getBBox();
      let moved = false;
      // 剩余空间不足,或 overlaped with previous label
      if (idx === 0 && box.maxY > groupBox.maxY) {
        // could not outof groupBox
        const yPos = groupBox.maxY - labelHeight / 2;
        label.attr('y', yPos);
        moved = true;
      } else if (idx > 0 && box.maxY > usableLabels[idx - 1].getBBox().minY) {
        // overlap with prev
        const yPos = usableLabels[idx - 1].getBBox().minY - labelHeight / 2;
        label.attr('y', yPos);
        moved = true;
      } else if (box.minY - groupBox.minY < (usableCount - (idx + 1)) * labelHeight) {
        // enough space for remained labels
        const newMinY = groupBox.minY + (usableCount - (idx + 1)) * labelHeight;
        label.attr('y', newMinY + labelHeight / 2);
        moved = true;
      }
      label.attr('moved', moved);
    }

    const ry = Math.max(rx, center.y - _.last(usableLabels).getBBox().minY);
    for (let idx = 0; idx < usableLabels.length; idx += 1) {
      const label = usableLabels[idx];
      if (label.attr('moved')) {
        const box = label.getBBox();
        const ryPow2 = ry * ry;
        const rxPow2 = rx * rx;
        const dyPow2 = Math.pow(Math.abs(box.y - center.y), 2);
        // (x - cx)^2 / rx ^ 2 + (y - cy)^2 / ry ^ 2 = 1
        let xPos = center.x - Math.sqrt((1 - dyPow2 / ryPow2) * rxPow2);
        const itemIdx = _.findIndex(items, (item) => item.id === label.id);
        const dAngle = (items[itemIdx + 1] ? items[itemIdx + 1].angle : -Math.PI / 2) - items[itemIdx].angle;
        // L=n× π× r/180
        xPos = Math.min(xPos, center.x - dAngle * r);
        label.attr('x', xPos);
      }
    }
  }

  // 获取label leader-line
  private _getLinePath(label: Shape, item: LabelItem, coord: Polar, panel: BBox): string {
    const smooth = true;
    const angle = item.angle;
    const center = coord.getCenter();
    const r = coord.getRadius();
    const offset = this.getOffsetOfLabel();
    const distance = this.getCrookDistance();
    const start = getEndPoint(center, angle, r);
    const isRight = item.textAlign === 'left';
    const breakAt = getEndPoint(center, angle, r + offset);
    const end = { x: label.attr('x') + (isRight ? -distance : distance), y: label.attr('y') };
    const theta = (angle / 180) * Math.PI;
    let smoothPath = [];
    if (theta) {
      smoothPath = ['Q', /** soft break */ breakAt.x, breakAt.y].concat([end.x, end.y]);
    } else {
      smoothPath = ['L', end.x, end.y];
    }
    const linePath = smooth ? smoothPath : ['L', /** pointy break */ breakAt.x, breakAt.y].concat(['L', end.x, end.y]);

    const path = ['M', start.x, start.y].concat(linePath);
    return path.join(',');
  }

  /** 获取label offset, 默认 16px 不允许 <= 0 */
  private getOffsetOfLabel(): number {
    const labelOptions = this.get('labelOptions');
    const offset = labelOptions.offset;
    return offset === undefined ? DEFAULT_OFFSET : offset <= CROOK_DISTANCE ? 1 : offset - CROOK_DISTANCE;
  }

  public getDefaultOffset(point) {
    const offset = super.getDefaultOffset(point);
    return offset === undefined ? DEFAULT_OFFSET : offset <= CROOK_DISTANCE ? 1 : offset - CROOK_DISTANCE;
  }

  private getCrookDistance(): number {
    const offset = this.getOffsetOfLabel();
    return offset > CROOK_DISTANCE ? CROOK_DISTANCE : 0;
  }
}

registerElementLabels('outer', OuterPieLabel);
