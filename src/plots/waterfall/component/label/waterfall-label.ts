/**
 * Create By Bruce Too
 * On 2020-02-18
 */
import * as _ from '@antv/util';
import ColumnLabel, { IColumnLabel } from '../../../column/component/label';
import { VALUE_FIELD } from '../../layer';

export default class WaterfallLabels extends ColumnLabel {
  constructor(cfg: IColumnLabel) {
    super(cfg);
  }
  public adjustLabel(label, shape) {
    const MARGIN = 2;
    const shapeBox = shape.getBBox();
    const origin = shape.cfg.origin.data;
    const values = origin[VALUE_FIELD];
    const diff = origin[this.plot.options.yField];
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
