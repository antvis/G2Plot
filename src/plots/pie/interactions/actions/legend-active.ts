import { IElement, IGroup } from '@antv/g-base';
import { Util, Element, Action } from '@antv/g2';
import { isEqual } from '@antv/util';
import { transform } from '../../../../utils/matrix';

/**
 * 饼图 图例激活 action
 */
export class PieLegendAction extends Action {
  /**
   * 获取激活的图形元素
   */
  private getActiveElements(): Element[] {
    const delegateObject = Util.getDelegationObject(this.context);
    if (delegateObject) {
      const view = this.context.view;
      const { component, item } = delegateObject;
      const field = component.get('field');
      if (field) {
        const elements = view.geometries[0].elements;
        return elements.filter((ele) => ele.getModel().data[field] === item.value);
      }
    }
    return [];
  }

  /**
   * 获取激活的标签
   */
  private getActiveElementLabels(): (IElement | IGroup)[] {
    const view = this.context.view;
    const elements = this.getActiveElements();
    const labels = view.geometries[0].labelsContainer.getChildren();
    return labels.filter((label) => elements.find((ele) => isEqual(ele.getData(), label.get('data'))));
  }

  protected transfrom(offset: number = 7.5) {
    const elements = this.getActiveElements();
    const elementLabels = this.getActiveElementLabels();
    elements.forEach((element, idx) => {
      const labelShape = elementLabels[idx];
      const coordinate = element.geometry.coordinate;
      if (coordinate.isPolar && coordinate.isTransposed) {
        const { startAngle, endAngle } = Util.getAngle(element.getModel(), coordinate);
        const middleAngle = (startAngle + endAngle) / 2;
        const r = offset;
        const x = r * Math.cos(middleAngle);
        const y = r * Math.sin(middleAngle);
        element.shape.setMatrix(transform([['t', x, y]]));
        labelShape.setMatrix(transform([['t', x, y]]));
      }
    });
  }

  public active() {
    this.transfrom();
  }

  /**
   * 激活态还原
   */
  public reset() {
    this.transfrom(0);
  }
}
