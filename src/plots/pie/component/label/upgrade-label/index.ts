import { getElementLabels, registerElementLabels } from '@antv/g2';
import { Shape, BBox, Marker } from '@antv/g';
import Polar from '@antv/coord/lib/coord/polar';
import * as _ from '@antv/util';
import { getEndPoint, getQuadrantByAngle, getOverlapArea, inPanel, getCenter } from '../utils';
import { LabelItem as BaseLabelItem } from '@antv/component/lib/interface';

const PieElementLabels = getElementLabels('pie');

// upgrade-pie label config
interface LabelItem extends BaseLabelItem {
  offset?: number;
  labelLine?: {
    smooth?: boolean;
  };
}
// 默认label和element的偏移 16px
const DEFAULT_OFFSET = 16;
const DEFAULT_TEXT_LINE_OFFSET = 4;
const MaxOverlapArea = 28;

type C = {
  rx: number;
  ry: number;
};

class UpgradePieLabels extends PieElementLabels {
  public showLabels(points: any, shapes: Shape[]) {
    super.showLabels(points, shapes);
    // 调整
    const renderer = this.get('labelsRenderer');
    const labels: Shape[] = renderer.get('group').get('children');
    const items = renderer.get('items') || [];
    const labelLines = renderer.get('lineGroup').get('children') || [];
    const view = this.get('element').get('view');
    const panel = view.get('panelRange');
    this.adjustLabelPosition(labels, items, panel);
    this.adjustOverlap(labels, panel);
    this.adjustLines(labels, items, labelLines);
    // after all, add distance between text and line-path
    labels.forEach((l, idx) => {
      const item = items[idx];
      const oldBox = l.getBBox();
      const alignment = item.textAlign;
      const distance = this.getTextLineOffset(item) * (alignment === 'left' ? 1 : -1);
      const newX = oldBox.x + distance * 2;
      const newBox = new BBox(newX, oldBox.y, oldBox.width, oldBox.height);
      l.attr('x', newX);
      l.set('box', newBox);
    });
    view.get('canvas').draw();
  }

  // label shape position
  public adjustLabelPosition(labels: Shape[], items: LabelItem[], panel: BBox) {
    const coord = this.get('coord');
    const center = coord.getCenter();
    const r = coord.getRadius();
    labels.forEach((l, idx) => {
      const item = items[idx];
      const oldBox = l.getBBox();
      const offset = this.getOffsetOfLabel(item);
      const pos = getEndPoint(center, item.angle, r + offset);
      const newBox = new BBox(pos.x, pos.y, oldBox.width, oldBox.height);
      l.attr('x', pos.x);
      l.attr('y', pos.y);
      l.set('box', newBox);
    });
    // 处理各象限坐标位置
    const part1 = items.filter((a) => getQuadrantByAngle(a.angle) === 0);
    const part1Labels = part1.map((a) => labels.find((l) => l.id === a.id));
    const part2 = items.filter((a) => getQuadrantByAngle(a.angle) === 1);
    const part2Labels = part2.map((a) => labels.find((l) => l.id === a.id));
    const part3 = items.filter((a) => getQuadrantByAngle(a.angle) === 2);
    const part3Labels = part3.map((a) => labels.find((l) => l.id === a.id));
    const part4 = items.filter((a) => getQuadrantByAngle(a.angle) === 3);
    const part4Labels = part4.map((a) => labels.find((l) => l.id === a.id));
    const { rx: rx1, ry: ry1 } = this._getQTRadius([...part1Labels].reverse(), panel, coord);
    const { ry: ry4 } = this._getQTRadius(part4Labels, panel, coord);
    const { rx: rx2, ry: ry2 } = this._getQBRadius(part2Labels, panel, coord);
    const { ry: ry3 } = this._getQBRadius([...part3Labels].reverse(), panel, coord);
    const cTop = { rx: rx1, ry: Math.max(ry1, ry4) };
    const cBottom = { rx: rx2, ry: Math.max(ry2, ry3) };
    this._adjustQ1Label(part1Labels, part1, cTop, coord);
    this._adjustQ2Label(part2Labels, part2, cBottom, coord);
    this._adjustQ3Label(part3Labels, part3, cBottom, coord);
    this._adjustQ4Label(part4Labels, part4, cTop, coord);
  }

  private _adjustQ1Label(labels: Shape[], items: LabelItem[], cr: C, coord: Polar): void {
    const center = coord.getCenter();
    const top = _.head(labels) ? _.head(labels).getBBox().minY : 0;
    const { rx, ry } = cr;
    // 理想情况下的标签可用空间
    if (center.y - ry < top) {
      // adjust 椭圆的y半轴 b
      labels.forEach((l, idx) => {
        const item = items[idx];
        const oldBox = l.getBBox();
        const newY = oldBox.y + (ry - rx) * Math.cos(Math.PI / 2 - item.angle);
        // 椭圆公式
        let newX = center.x + Math.sqrt(1 - Math.pow(newY - center.y, 2) / Math.pow(ry, 2)) * rx;
        if (Number.isNaN(newX)) {
          newX = oldBox.x - DEFAULT_OFFSET;
        }
        // offset between label-text and label-line
        const newBox = new BBox(newX, newY, oldBox.width, oldBox.height);
        l.attr('x', newX);
        l.attr('y', newY);
        l.set('box', newBox);
      });
    }
  }

  private _adjustQ2Label(labels: Shape[], items: LabelItem[], cr: C, coord: Polar): void {
    const center = coord.getCenter();
    const { rx, ry } = cr;
    let totalHeight = 0;
    _.each(labels, (l) => (totalHeight += l.getBBox().height));
    const top = _.head(labels) ? _.head(labels).getBBox().minY : 0;
    const bottom = _.last(labels) ? _.last(labels).getBBox().maxY : 0;
    // 总高度超出, 溢出的设置隐藏
    if (totalHeight > ry) {
      // adjust 椭圆的y半轴 b
      let yPos = top;
      labels.forEach((l, idx) => {
        const oldBox = l.getBBox();
        let newY = yPos;
        if (bottom - top < ry) {
          newY = Math.max(newY, oldBox.y);
        }
        const newX = oldBox.x;
        // offset between label-text and label-line
        const newBox = new BBox(newX, newY, oldBox.width, oldBox.height);
        l.attr('x', newX);
        l.attr('y', newY);
        l.set('box', newBox);
        yPos = newBox.maxY;
      });
    } else {
      // 总高度没溢出 调整所有label在椭圆轨道上
      labels.reverse();
      let yPos = Math.max(center.y + ry, bottom);
      labels.forEach((l, idx) => {
        const oldBox = l.getBBox();
        // y 近似坐标
        let newY = oldBox.y + (ry - rx) * Math.cos(items[idx].angle) - oldBox.height;
        // make label leader-line more nice looking
        newY = Math.max(newY, oldBox.y);
        // 不能和上一标签遮挡
        newY = Math.min(newY, yPos - oldBox.height);
        // 椭圆公式
        let newX = center.x + Math.sqrt(1 - Math.pow(newY - center.y, 2) / Math.pow(ry, 2)) * rx;
        if (Number.isNaN(newX)) {
          newX = oldBox.x + DEFAULT_OFFSET;
        }
        newX = Math.min(oldBox.x, newX);
        // offset between label-text and label-line
        const newBox = new BBox(newX, newY, oldBox.width, oldBox.height);
        l.attr('x', newX);
        l.attr('y', newY);
        l.set('box', newBox);
        yPos = newBox.minY;
      });
      // 反转回去
      labels.reverse();
    }
  }

  private _adjustQ3Label(labels: Shape[], items: LabelItem[], cr: C, coord: Polar): void {
    const { rx, ry } = cr;
    const center = coord.getCenter();
    let totalHeight = 0;
    const bottom = _.head(labels) ? _.head(labels).getBBox().maxY : ry;
    _.each(labels, (l) => (totalHeight += l.getBBox().height));
    // 总高度超出, 溢出的设置隐藏
    if (totalHeight > ry) {
      // adjust 椭圆的y半轴 b
      let yPos = center.y + ry;
      labels.forEach((l, idx) => {
        const oldBox = l.getBBox();
        // fix: 不出现在第四象限
        const newY = Math.max(yPos - oldBox.height, center.y);
        // 椭圆公式
        let newX = center.x - Math.sqrt(1 - Math.pow(newY - center.y, 2) / Math.pow(ry, 2)) * rx;
        if (Number.isNaN(newX)) {
          newX = oldBox.x - DEFAULT_OFFSET;
        }
        newX = Math.min(oldBox.x, newX);
        // offset between label-text and label-line
        const newBox = new BBox(newX, newY, oldBox.width, oldBox.height);
        l.attr('x', newX);
        l.attr('y', newY);
        l.set('box', newBox);
        yPos = newBox.minY;
      });
    } else {
      // 总高度没溢出 调整所有label在椭圆轨道上
      let yPos = Math.max(center.y + ry, bottom);
      labels.forEach((l, idx) => {
        const oldBox = l.getBBox();
        // y 近似坐标
        let newY = oldBox.y + (ry - rx) * Math.cos(items[idx].angle - Math.PI / 2);
        // make label leader-line more nice looking
        newY = Math.max(newY, oldBox.y);
        // 不能和上一标签遮挡
        newY = Math.min(newY, yPos - oldBox.height);
        // 椭圆公式
        let newX = center.x - Math.sqrt(1 - Math.pow(newY - center.y, 2) / Math.pow(ry, 2)) * rx;
        if (Number.isNaN(newX)) {
          newX = oldBox.x - DEFAULT_OFFSET;
        }
        newX = Math.min(oldBox.x, newX);
        // offset between label-text and label-line
        const newBox = new BBox(newX, newY, oldBox.width, oldBox.height);
        l.attr('x', newX);
        l.attr('y', newY);
        l.set('box', newBox);
        yPos = newBox.minY;
      });
    }
  }

  private _adjustQ4Label(labels: Shape[], items: LabelItem[], cr: C, coord: Polar): void {
    const center = coord.getCenter();
    // 所有标签的累计高度
    let totalHeight = 0;
    labels.forEach((l) => (totalHeight += l.getBBox().height));
    const top = _.last(labels) ? _.last(labels).getBBox().minY : 0;
    const { rx, ry } = cr;
    // 总高度超出, 溢出的设置隐藏
    if (totalHeight > ry) {
      let yPos = center.y;
      labels.forEach((l, idx) => {
        const oldBox = l.getBBox();
        const newY = yPos - oldBox.height;
        // 椭圆公式
        let newX = center.x - Math.sqrt(1 - Math.pow(newY - center.y, 2) / Math.pow(ry, 2)) * rx;
        if (Number.isNaN(newX)) {
          const prevLabel = labels[idx - 1];
          newX = prevLabel ? prevLabel.getBBox().x + 8 : oldBox.x - DEFAULT_OFFSET;
        }
        // 不能进入第一象限
        newX = Math.min(newX, center.x);
        // offset between label-text and label-line
        const newBox = new BBox(newX, newY, oldBox.width, oldBox.height);
        l.attr('x', newX);
        l.attr('y', newY);
        l.set('box', newBox);
        yPos = newBox.minY;
      });
    } else {
      // 总高度没溢出 调整所有label在椭圆轨道上
      // from top to bottom
      labels.reverse();
      let yPos = center.y - ry;
      labels.forEach((l, idx) => {
        const oldBox = l.getBBox();
        // y 近似坐标
        let newY = oldBox.y - (ry - rx) * Math.cos(Math.PI + items[idx].angle);
        // 不能和上一标签遮挡
        newY = Math.max(newY, yPos);
        // 椭圆公式
        let newX = center.x - Math.sqrt(1 - Math.pow(newY - center.y, 2) / Math.pow(ry, 2)) * rx;
        if (Number.isNaN(newX)) {
          const prevLabel = labels[idx - 1];
          newX = prevLabel ? prevLabel.getBBox().x - 8 : oldBox.x - DEFAULT_OFFSET;
        }
        // 不能进入第一象限
        newX = Math.min(newX, center.x);
        // offset between label-text and label-line
        const newBox = new BBox(newX, newY, oldBox.width, oldBox.height);
        l.attr('x', newX);
        l.attr('y', newY);
        l.set('box', newBox);
        yPos = newBox.maxY;
      });
      labels.reverse();
    }
  }

  // 获取第一象限和第四象限的长半轴和短半轴
  private _getQTRadius(labels: Shape[], panel: BBox, coord: Polar): C {
    // 所有标签的累计高度
    let totalHeight = 0;
    labels.forEach((l) => (totalHeight += l.getBBox().height));
    const top = _.last(labels) ? _.last(labels).getBBox().minY : 0;
    const bottom = _.head(labels) ? _.head(labels).getBBox().maxY : 0;
    const offset = DEFAULT_OFFSET;
    const r = coord.getRadius() + offset;
    // 椭圆的x半轴 a
    const rx = r;
    // 椭圆的y半轴 b
    let ry = r;
    // 理想情况下的标签可用空间
    if (bottom - top < totalHeight) {
      // adjust 椭圆的y半轴 b
      ry = r + (top - panel.minY - labels[0].getBBox().height);
    }
    return { rx, ry };
  }

  // 获取第二象限和第三象限的长半轴和短半轴
  private _getQBRadius(labels: Shape[], panel: BBox, coord: Polar): C {
    // 所有标签的累计高度
    let totalHeight = 0;
    labels.forEach((l) => (totalHeight += l.getBBox().height));
    const bottom = _.last(labels) ? _.last(labels).getBBox().maxY : 0;
    const top = _.head(labels) ? _.head(labels).getBBox().minY : 0;
    const offset = DEFAULT_OFFSET;
    const r = coord.getRadius() + offset;
    // 椭圆的x半轴 a
    const rx = r;
    // 椭圆的y半轴 b
    let ry = r;
    // 理想情况下的标签可用空间
    if (bottom - top < totalHeight) {
      // adjust 椭圆的y半轴 b
      ry = panel.maxY - labels[0].getBBox().maxY;
    }
    return { rx, ry };
  }

  // 处理label遮挡问题
  protected adjustOverlap(labels: Shape[], panel: BBox, forceVisible?: boolean): void {
    // clearOverlap;
    function hideLabel(shape: Shape): void {
      // 需要隐藏的标签
      if (!forceVisible) {
        shape.set('visible', false);
      }
    }
    for (let i = 1; i < labels.length; i++) {
      const label = labels[i];
      let overlapArea = 0;
      for (let j = i - 1; j > 0; j--) {
        const prev = labels[j];
        // if the previous one is invisible, skip
        if (prev.get('visible')) {
          // fix 增加容忍范围
          overlapArea = getOverlapArea(prev.getBBox(), label.getBBox()) - MaxOverlapArea;
        }
        if (overlapArea > 0 && prev.attr('textAlign') === label.attr('textAlign')) {
          break;
        }
      }
      if (overlapArea > 0) {
        hideLabel(label);
      }
    }
    labels.forEach((label) => this.checkInPanel(label, panel));
  }

  // 超出panel边界的标签默认隐藏
  protected checkInPanel(label: Shape, panel: BBox): void {
    if (!inPanel(panel, label.getBBox())) {
      label.set('visible', false);
    }
  }

  // adjust label leader-line
  public adjustLines(labels: Shape[], labelItems: LabelItem[], labelLines: any) {
    const coord = this.get('coord');
    const panel = this.get('element')
      .get('view')
      .get('panelRange');
    _.each(labels, (label, idx: number) => {
      const labelLine = labelLines[idx];
      const labelItem = labelItems[idx];
      // 由于布局调整，修改的只是shape 所以取用使用shape(labelItem is read-only)
      const path = this.getLinePath(label, labelItem, coord, panel);
      labelLine.attr('path', path);
      labelLine.set('visible', label.get('visible'));
    });
  }

  // 获取label leader-line
  private getLinePath(label: Shape, labelItem: LabelItem, coord: Polar, panel: BBox): string {
    let path = '';
    // 处理smooth
    const smooth = labelItem.labelLine ? labelItem.labelLine.smooth : false;
    const angle = labelItem.angle;
    const center = coord.getCenter();
    const r = coord.getRadius();
    const start = getEndPoint(center, angle, r);
    // because shape is adjusted, so we should getAttrbutes by shape
    const offset = this.getOffsetOfLabel(labelItem);
    const breakAt = getEndPoint(center, angle, r + offset);
    const end = { x: label.attr('x'), y: label.attr('y') };
    path = [`M ${start.x}`, `${start.y} Q${breakAt.x}`, `${breakAt.y} ${end.x}`, end.y].join(',');
    if (!smooth) {
      const alignment = labelItem.textAlign;
      const distance = this.getTextLineOffset(labelItem) * (alignment === 'left' ? 1 : -1);
      const quadrant = getQuadrantByAngle(angle);
      if (quadrant === 2) {
        // expected end.y >= start.y, when label is in Quadrant 2. if not, 求 切点
        if (end.y < start.y) {
          const theta = Math.PI - angle;
          breakAt.x = start.x - (start.y - end.y) * Math.tan(theta);
        }
      }
      if (quadrant === 3) {
        // expected end.x < breakAt.y. if not, adjust
        if (end.x > breakAt.x) {
          breakAt.x = end.x;
        }
        // normal situation breakAt.y === end.y and end.y <= start.y. if not, adjust
        if (breakAt.y !== end.y && end.y <= start.y) {
          breakAt.x = end.x + Math.abs(distance) * 2;
          breakAt.y = end.y;
        }
      }
      // normal path rule, draw path is "M -> L -> H"
      path = [`M ${start.x}`, `${start.y} L${breakAt.x}`, `${end.y} H${end.x + distance}`].join(',');
      if (quadrant === 3) {
        if (end.y > start.y) {
          // expected end.y <= start.y, when label is in Quadrant 3. if not, adjust draw path to "M -> H -> L"
          // 近似将椭圆作为圆计算
          const controlX = end.x - Math.cos(Math.PI * 2 + angle) * (end.y - start.y);
          path = [`M ${start.x}`, `${start.y}`, `H${controlX} L${end.x + distance}`, `${end.y}`].join(',');
        }
      }
    }
    return path;
  }

  public adjustItems(originItems: LabelItem[]) {
    // could not extends super
    return originItems;
  }

  // 获取label offset, 不允许 <= 0
  public getOffsetOfLabel(labelItem?: LabelItem): number {
    const offset = (labelItem && labelItem.offset) || DEFAULT_OFFSET;
    return offset > 0 ? offset : 1;
  }

  // 获取offset betwee label-text and label-line
  private getTextLineOffset(labelItem?: LabelItem): number {
    return Math.min(this.getOffsetOfLabel(labelItem), DEFAULT_TEXT_LINE_OFFSET);
  }
}

registerElementLabels('upgrade-pie', UpgradePieLabels);
