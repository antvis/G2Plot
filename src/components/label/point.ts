import { get, clone, map, isArray, last } from '@antv/util';
import { Element, MappingDatum } from '../../dependents';
import BaseLabel, { registerLabelComponent } from '../../components/label/base';
import { TextStyle } from '../../interface/config';

export default class PointLabel extends BaseLabel {
  protected getDefaultOptions() {
    const { theme } = this.layer;
    const labelStyle = clone(theme.label.style);
    return {
      offset: theme.label?.offset,
      offsetX: 0,
      offsetY: 0,
      style: labelStyle,
    };
  }

  protected getLabelItemAttrs(element: Element, idx: number): TextStyle[] {
    const { style, formatter } = this.options;
    const { shape } = element;
    const mappingData: MappingDatum[] = get(element, 'model.mappingData', []);

    return map(mappingData, (datum) => {
      const value = this.getValue(datum);
      return {
        ...this.getPosition(datum),
        text: formatter ? formatter(value, shape, idx) : value,
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
