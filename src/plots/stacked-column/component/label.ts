import { registerLabelComponent } from '../../../components/label/label';
import ColumnLabel from '../../column/component/label';
import { IShape, Element } from '../../../dependents';

export default class StackedColumnLabel extends ColumnLabel {
  protected adjustLabel(label: IShape, element: Element): void {
    const { adjustPosition } = this.options;
    if (adjustPosition) {
      const labelRange = label.getBBox();
      const shapeRange = this.getElementShapeBBox(element);
      if (shapeRange.height < labelRange.height) {
        label.hide();
      }
    }
  }
}

registerLabelComponent('stacked-column', StackedColumnLabel);
