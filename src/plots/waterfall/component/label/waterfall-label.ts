import { registerElementLabels, ElementLabels } from '@antv/g2';
import * as _ from '@antv/util';
import { ColumnLabels } from '../../../column/component/label/column-label';
import { VALUE_FIELD } from '../../layer';

class WaterfallLabels extends ColumnLabels {
  public adjustPosition(label, shape, item) {
    const MARGIN = 2;
    const shapeBox = shape.getBBox();
    const origin = label.get('origin');
    const yField = item.fields[0];
    const values = origin[VALUE_FIELD];
    const diff = origin[yField];
    const value = _.isArray(values) ? values[1] : values;
    let yPos = (shapeBox.minY + shapeBox.maxY) / 2;
    let textBaseline = 'bottom';

    if (diff < 0) {
      yPos = shapeBox.maxY + MARGIN;
      textBaseline = 'top';
    } else {
      yPos = shapeBox.minY - MARGIN;
    }

    label.attr('y', yPos);
    label.attr('text', value);
    label.attr('textBaseline', textBaseline);
  }
}

registerElementLabels('waterfall', WaterfallLabels);
