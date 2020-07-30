import { registerLabelComponent } from '../../../components/label/base';
import ColumnLabel from '../../column/component/label';
import { IShape, Element } from '../../../dependents';

export default class StackedColumnLabel extends ColumnLabel {
  protected adjustLabel(label: IShape, element: Element): void {
    const { adjustPosition } = this.options;
    if (adjustPosition) {
      const labelRange = label.getBBox();
      const shapeRange = this.getElementShapeBBox(element);
      if (shapeRange.height < labelRange.height || shapeRange.width < labelRange.width) {
        // 如果文本的高度超出图形的高度或者文本的宽度超出图形的宽度就不显示
        label.hide();
      }
    }
  }
}

registerLabelComponent('stacked-column', StackedColumnLabel);
