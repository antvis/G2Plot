import { registerGeometryLabel } from '@antv/g2';
import { ColumnLabels } from '../../../column/component/label/column-label';

class StackColumnLabels extends ColumnLabels {
  public adjustPosition(label, shape) {
    const labelRange = label.getBBox();
    const shapeRange = shape.getBBox();
    if (shapeRange.height <= labelRange.height) {
      label.attr('opacity', 0);
      label.attr('fillOpacity', 0);
      label.attr('strokeOpacity', 0);
      label.set('capture', false);
    }
  }
}

registerGeometryLabel('stackColumnLabel', StackColumnLabels);
