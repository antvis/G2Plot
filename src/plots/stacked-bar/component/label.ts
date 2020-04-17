import { Element, IShape } from '../../../dependents';
import { registerLabelComponent } from '../../../components/label/base';
import BarLabel from '../../bar/component/label';

export default class StackedBarLabel extends BarLabel {
  protected adjustLabel(label: IShape, element: Element) {
    if (this.options.adjustPosition) {
      const labelRange = label.getBBox();
      const shapeRange = this.getElementShapeBBox(element);
      // label 有 offset
      if (shapeRange.maxX <= labelRange.maxX) {
        label.set('visible', false);
      }
    }
  }
}

registerLabelComponent('stacked-bar', StackedBarLabel);
