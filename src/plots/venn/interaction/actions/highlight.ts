import { getActionClass } from '@antv/g2';
import { placeElementsOrdered } from '../util';

const ElementHighlightAction: any = getActionClass('element-highlight');

export class VennElementHighlight extends ElementHighlightAction {
  /**
   * 同步所有元素的位置
   */
  protected syncElementsPos() {
    placeElementsOrdered(this.context.view);
  }

  /** 高亮图形元素 */
  public highlight() {
    super.highlight();
    this.syncElementsPos();
  }

  /** toggle 图形元素高亮状态 */
  public toggle() {
    super.toggle();
    this.syncElementsPos();
  }

  /** 清楚 */
  public clear() {
    super.clear();
    this.syncElementsPos();
  }

  /** 重置 */
  public reset() {
    super.reset();
    this.syncElementsPos();
  }
}
