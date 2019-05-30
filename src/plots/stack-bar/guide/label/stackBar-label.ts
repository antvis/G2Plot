import { Shape } from '@antv/g';
import { registerElementLabels } from '@antv/g2';
import { BarLabels } from '../../../bar/guide/label/bar-label';
import * as _ from '@antv/util';

class StackBarLabels extends BarLabels {

  adjustPosition(label, shape) {
    const labelRange = label.getBBox();
    const shapeRange = shape.getBBox();
    if (shapeRange.width <= labelRange.width) {
      label.attr('opacity', 0);
      label.set('capture', false);
    }
  }

}

registerElementLabels('stackBarLabel', StackBarLabels);
