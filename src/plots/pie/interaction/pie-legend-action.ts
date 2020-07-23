import { Util } from '@antv/g2';
import Element from '@antv/g2/lib/geometry/element';
import { Action } from '@antv/g2/lib/interaction';
import { getDelegationObject } from '@antv/g2/lib/interaction/action/util';
import { groupTransform } from '../../../utils/g-util';

/**
 * 饼图 图例激活 action
 */
export class PieLegendAction extends Action {
  init() {
    const { view } = this.context;
    view.interaction('legend-active');
  }
  /**
   * 获取激活的图形元素
   */
  private getActiveElements(): Element[] {
    const delegateObject = getDelegationObject(this.context);
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

  public active() {
    const elements = this.getActiveElements();
    elements.forEach((element) => {
      const coordinate = element.geometry.coordinate;
      if (coordinate.isPolar && coordinate.isTransposed) {
        const { startAngle, endAngle } = Util.getAngle(element.getModel(), coordinate);
        const middleAngle = (startAngle + endAngle) / 2;
        /** offset 偏移 */
        const r = 7.5;
        const x = r * Math.cos(middleAngle);
        const y = r * Math.sin(middleAngle);
        groupTransform(element.shape, [['t', x, y]]);
      }
    });
  }
}
