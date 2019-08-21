import { Shape } from '@antv/g';
import { registerElementLabels } from '@antv/g2';
import * as _ from '@antv/util';
import { BarLabels } from '../../../bar/guide/label/bar-label';

class StackBarLabels extends BarLabels {
  public adjustPosition(label, shape) {
    const labelRange = label.getBBox();
    const shapeRange = shape.getBBox();
    if (shapeRange.width <= labelRange.width) {
      label.attr('opacity', 0);
      label.set('capture', false);
    }
  }
}

registerElementLabels('stackBarLabel', StackBarLabels);
