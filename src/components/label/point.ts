import { get, map, isArray, last } from '@antv/util';
import { Element, MappingDatum, _ORIGIN } from '../../dependents';
import BaseLabel, { registerLabelComponent } from '../../components/label/base';
import { TextStyle, Label } from '../../interface/config';

export default class PointLabel<L extends Label = Label> extends BaseLabel<L> {
  protected getDefaultOptions() {
    const { theme } = this.layer;
    const { label = {} } = theme;
    return {
      offsetX: 0,
      offsetY: 0,
      ...label,
    };
  }

  protected getLabelOffset() {
    return this.getLabelOffsetByDimAndFactor('y', -1);
  }

  protected getLabelItemAttrs(element: Element, index: number): TextStyle[] {
    const { style, formatter } = this.options;
    const mappingData: MappingDatum[] = get(element, 'model.mappingData', []);

    return map(mappingData, (datum, datumIndex) => {
      const value = this.getValue(datum);
      return {
        ...this.getPosition(datum),
        text: formatter
          ? formatter(
              value,
              {
                [_ORIGIN]: datum._origin,
                mappingDatum: datum,
                mappingDatumIndex: datumIndex,
                element,
                elementIndex: index,
              },
              index
            )
          : value,
        textAlign: 'center',
        textBaseline: 'middle',
        ...style,
      };
    });
  }

  protected getValue(datum: MappingDatum): number | undefined | null {
    return get(datum._origin, this.layer.options.yField);
  }

  protected getPosition(datum: MappingDatum): { x: number; y: number } {
    const pos = {
      x: isArray(datum.x) ? last(datum.x) : datum.x,
      y: isArray(datum.y) ? last(datum.y) : datum.y,
    };
    return pos;
  }

  protected adjustLabel() {
    return;
  }
}

registerLabelComponent('point', PointLabel);
