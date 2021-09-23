import { InteractionAction } from '@antv/g2';

class VennElementState extends InteractionAction {
  /** tofront: 同步所有元素的位置  */
  protected syncElementsPos() {
    const elements = this.getVennElements();
    elements.forEach((elem) => {
      elem.shape.toFront();
    });
  }
  /** 获取 venn 图的 elements */
  protected getVennElements() {
    const view = this.context.view;
    // @ts-ignore
    return view.geometries[0].elements.filter((elem) => elem.shapeType === 'venn');
  }
}

export class VennElementActive extends VennElementState {
  /** hover */
  public active() {
    const { data } = this.context.event.data;
    const elements = this.getVennElements();

    elements.forEach((elem) => {
      // @ts-ignore
      const activeState = data === elem.data;
      elem.setState('active', activeState);
    });
    // tofront: 同步所有元素的位置
    this.syncElementsPos();
  }

  /** 重置 */
  public reset() {
    const elements = this.getVennElements();

    elements.forEach((elem) => {
      // 所有元素的 state 统一 false
      elem.setState('active', false);
    });
    // tofront: 同步所有元素的位置
    this.syncElementsPos();
  }
}

export class VennElementSelected extends VennElementState {
  /** 切换 */
  public toggle() {
    const { data } = this.context.event.data;
    const elements = this.getVennElements();

    elements.forEach((elem) => {
      // @ts-ignore
      if (data === elem.data) {
        const selectedState = elem.getStates().includes('selected');
        elem.setState('selected', !selectedState);
      }
    });
    // tofront: 同步所有元素的位置
    this.syncElementsPos();
  }

  /** 重置 */
  public reset() {
    const elements = this.getVennElements();

    elements.forEach((elem) => {
      // 所有元素的 state 统一 false
      elem.setState('selected', false);
    });
    // tofront: 同步所有元素的位置
    this.syncElementsPos();
  }
}
