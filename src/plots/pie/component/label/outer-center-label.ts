import { IShape, BBox } from '../../../../dependents';
import PieBaseLabel, { LabelItem, PieLabelConfig } from './base-label';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  protected layout(labels: IShape[], items: LabelItem[], panel: BBox) {}
}
