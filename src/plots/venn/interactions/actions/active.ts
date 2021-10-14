import { getActionClass } from '@antv/g2';
import { placeElementsOrdered } from '../util';

const ElementActiveAction: any = getActionClass('element-active');

export class VennElementActive extends ElementActiveAction {
  /**
   * 同步所有元素的位置
   */
  protected syncElementsPos() {
    placeElementsOrdered(this.context.view);
  }

  /** 激活图形元素 */
  public active() {
    super.active();
    this.syncElementsPos();
  }

  /** toggle 图形元素激活状态 */
  public toggle() {
    super.toggle();
    this.syncElementsPos();
  }

  /** 重置 */
  public reset() {
    super.reset();
    this.syncElementsPos();
  }
}
