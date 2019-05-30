import { registerElementLabels } from '@antv/g2';
import { ColumnLabels } from '../../../column/guide/label/column-label';
import * as _ from '@antv/util';

class StackColumnLabels extends ColumnLabels {

  adjustPosition(label, shape) {
    const labelRange = label.getBBox();
    const shapeRange = shape.getBBox();
    if (shapeRange.height <= labelRange.height) {
      label.attr('opacity', 0);
      label.set('capture', false);
    }
  }

}

registerElementLabels('stackColumnLabel', StackColumnLabels);
