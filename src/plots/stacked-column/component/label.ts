import { clone } from '@antv/util';
import ColumnLabel from '../../column/component/label';

export default class StackColumnLabel extends ColumnLabel {
  protected getDefaultOptions() {
    const { theme } = this.plot;
    const labelStyle = theme.label.style;
    return {
      offsetX: 0,
      offsetY: 0,
      style: clone(labelStyle),
      adjustPosition: true,
    };
  }

  protected adjustLabel(label, shape) {
    if (this.options.adjustPosition) {
      const labelRange = label.getBBox();
      const shapeRange = shape.getBBox();
      if (shapeRange.height <= labelRange.height) {
        label.attr('text', '');
      }
    }
  }
}
