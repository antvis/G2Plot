import { getActionClass } from '@antv/g2';
import { placeElementsOrdered } from '../util';

const ElementSelectedAction: any = getActionClass('element-selected');
const ElementSingleSelectedAction: any = getActionClass('element-single-selected');

/**
 * 韦恩图元素 多选交互
 */
export class VennElementSelected extends ElementSelectedAction {
  /**
   * 同步所有元素的位置
   */
  protected syncElementsPos() {
    placeElementsOrdered(this.context.view);
  }

  /** 激活图形元素 */
  public selected() {
    super.selected();
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

/**
 * 韦恩图元素 单选交互
 */
export class VennElementSingleSelected extends ElementSingleSelectedAction {
  /**
   * 同步所有元素的位置
   */
  protected syncElementsPos() {
    placeElementsOrdered(this.context.view);
  }

  /** 激活图形元素 */
  public selected() {
    super.selected();
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
