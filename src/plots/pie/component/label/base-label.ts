import { LabelItem } from '@antv/component/lib/interface';
import Polar from '@antv/coord/lib/coord/polar';
import { BBox, Shape } from '@antv/g';
import { getElementLabels } from '@antv/g2';
import { getOverlapArea, getEndPoint, near } from './utils';
import { getEllipsisText } from './utils/text';
import { PieViewConfig } from '../../layer';

const PieElementLabels = getElementLabels('pie');

interface LabelData {
  name: string;
  value: number;
  percent: number;
}
/**
 * @desc eva-pie 所有自定义 pie-label 的基类
 */
export default abstract class extends PieElementLabels {
  // labels 的 起点锚点 anchorRadius: r + offset
  protected anchors: Array<{ x: number; y: number; id: string } & LabelItem>;
  protected anchorRadius: number;
  public showLabels(points: any, shapes: Shape[]) {
    super.showLabels(points, shapes);
    const view = this.get('element').get('view');
    const coord = this.get('coord');
    const panel = view.get('panelRange');
    // 调整
    const renderer = this.get('labelsRenderer');
    const labels: Shape[] = renderer.get('group').get('children');
    // 注入data数据
    const data = view.get('filteredData');
    const { fields } = this.getLabelOptions();
    const angleField = fields[0];
    const colorField = fields[1];
    const scale = view.get('scales')[angleField];
    labels.forEach((label, idx) => {
      const dataItem = data[idx];
      const percentage = scale.scale(dataItem[angleField]);
      label.attr('data', { value: dataItem[angleField], name: dataItem[colorField], percent: percentage });
    });
    const items = renderer.get('items') || [];
    // 处理 label anchors
    this.anchors = [];
    const anchorRadius = coord.getRadius() + this.getOffsetOfLabel();
    this.anchorRadius = anchorRadius;
    labels.forEach((label, idx) => {
      const item = items[idx];
      const point = getEndPoint(coord.getCenter(), item.angle, anchorRadius);
      this.anchors.push({ ...item, ...point, id: label.id });
    });
    const labelLines = renderer.get('lineGroup').get('children') || [];
    this.adjustPosition(labels, items, coord, panel);
    this.adjustTexts(labels, items, coord, panel);
    // should adjust overlap before asjustLines
    this.adjustOverlap(labels, panel);
    this.adjustLines(labels, items, labelLines, coord, panel);
    view.get('canvas').draw();
  }

  /** 调整 labels */
  public abstract adjustPosition(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox): void;

  /** 调整 label lines */
  public abstract adjustLines(labels: Shape[], items: LabelItem[], lines: Shape[], coord: Polar, panel: BBox): void;

  /** 调整 label texts */
  public adjustTexts(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    labels.forEach((label) => {
      const anchor = items.find((v) => v.id === label.id);
      this.adjustLabelText(label, anchor, coord, panel);
    });
  }

  public adjustItems(originItems: LabelItem[]) {
    // could not extends super
    return originItems;
  }

  /** 调整 label text */
  protected adjustLabelText(label: Shape, item: LabelItem, coord: Polar, panel: BBox) {
    const box = label.getBBox();
    const textAlign = item.textAlign;
    const maxWidth = textAlign === 'right' ? box.maxX - panel.minX : panel.maxX - box.minX;
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

  /** 处理标签遮挡问题 */
  protected adjustOverlap(labels: Shape[], panel: BBox): void {
    // 由于 sort 会改变 labels 顺序，因此这里需要浅拷贝
    const adjustLabels = labels.slice();
    if (this.getLabelOptions().allowOverlap) {
      return;
    }
    adjustLabels.sort((labelA, labelB) => {
      const labelAValue = labelA.attr('data').value;
      const labelBValue = labelB.attr('data').value;
      if (labelAValue > labelBValue) {
        return -1;
      }
      return 1;
    });
    // clearOverlap;
    for (let i = 1; i < adjustLabels.length; i++) {
      const label = adjustLabels[i];
      let overlapArea = 0;
      for (let j = i - 1; j >= 0; j--) {
        const prev = adjustLabels[j];
        // fix: start draw point.x is error when textAlign is right
        const prevBox = prev.getBBox();
        const currBox = label.getBBox();
        // if the previous one is invisible, skip
        if (prev.get('visible')) {
          overlapArea = getOverlapArea(prevBox, currBox);
          if (!near(overlapArea, 0)) {
            label.set('visible', false);
            break;
          }
        }
      }
    }
    adjustLabels.forEach((label) => this.checkInPanel(label, panel));
  }

  /**
   * 超出panel边界的标签默认隐藏
   */
  protected checkInPanel(label: Shape, panel: BBox): void {
    const box = label.getBBox();
    //  横向溢出 暂不隐藏
    if (!(panel.y <= box.y && panel.y + panel.height >= box.y + box.height)) {
      label.set('visible', false);
    }
  }

  /** 默认用户配置的offset,  */
  protected abstract getOffsetOfLabel(): number;

  protected getLabelOptions(): PieViewConfig['label'] {
    return this.get('labelOptions');
  }
}
