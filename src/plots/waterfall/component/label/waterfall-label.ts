/**
 * Create By Bruce Too
 * On 2020-02-18
 */
import { isArray } from '@antv/util';

import ColumnLabel from '../../../column/component/label';
import { IShape, Element } from '../../../../dependents';
import { VALUE_FIELD, INDEX_FIELD } from '../../layer';
import { registerLabelComponent } from '../../../../components/label/base';
import { MappingDatum, _ORIGIN } from '../../../../dependents';

const MARGIN = 2;

export default class WaterfallLabel extends ColumnLabel {
  protected adjustLabel(label: IShape, element: Element): void {
    const { shape } = element;
    const shapeBox = shape.getBBox();
    const data = element.getData();
    const values = data[VALUE_FIELD];
    const diff = data[this.layer.options.yField];
    const value = isArray(values) ? values[1] : values;
    const { formatter } = this.options;
    const mappingData: MappingDatum[] = [].concat(element.getModel().mappingData);
    const elementIndex = formatter ? mappingData[0] && mappingData[0]['_origin'][INDEX_FIELD] : 0;
    const formatterValue = formatter
      ? formatter(
          value,
          {
            [_ORIGIN]: mappingData[0]?._origin,
            mappingDatum: mappingData[0],
            mappingDatumIndex: 0,
            element,
            elementIndex,
          },
          elementIndex
        )
      : value;
    let yPos = (shapeBox.minY + shapeBox.maxY) / 2;
    let textBaseline = 'bottom';

    if (diff < 0) {
      yPos = shapeBox.maxY + MARGIN;
      textBaseline = 'top';
    } else {
      yPos = shapeBox.minY - MARGIN;
    }

    label.attr('y', yPos);
    label.attr('text', formatterValue);
    label.attr('textBaseline', textBaseline);
  }
}

registerLabelComponent('waterfall', WaterfallLabel);
