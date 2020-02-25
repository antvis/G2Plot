import { IShape, BBox } from '@antv/g-canvas';
import PieBaseLabel, { LabelItem, PieLabelConfig } from './base-label';
import { getOverlapArea, near } from './utils';

// 默认label和element的偏移 16px
export const DEFAULT_OFFSET = 16;

export default class PieOuterCenterLabel extends PieBaseLabel {
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

  protected adjustItem(item: LabelItem): void {
    const offset = this.options.offset;
    if (item.textAlign === 'left') {
      item.x += offset > 4 ? 4 : offset / 2;
    } else if (item.textAlign === 'right') {
      item.x -= offset > 4 ? 4 : offset / 2;
    }
  }

  /** label 碰撞调整 */
  protected layout(labels: IShape[], items: LabelItem[], panel: BBox) {
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
}
