import { get, clone, map, isArray, head, last } from '@antv/util';
import { Element, MappingDatum } from '../../dependents';
import BaseLabel, { registerLabelComponent } from '../../components/label/base';
import { TextStyle } from '../../interface/config';

export const DEFAULT_OFFSET = 8;

export default class PointLabel extends BaseLabel {
  protected getDefaultOptions() {
    const { theme } = this.layer;
    const labelStyle = clone(theme.label.style);
    return {
      offsetX: DEFAULT_OFFSET,
      offsetY: 0,
      style: labelStyle,
    };
  }

  protected getLabelItemConfig(element: Element, idx: number): TextStyle[] {
    const { style, formatter } = this.options;
    const { shape } = element;
    const mappingData: MappingDatum[] = get(element, 'model.mappingData', []);

    return map(mappingData, (datum, datumIdx) => {
      const value = this.getValue(datum);
      return {
        ...this.getPosition(datum),
        text: formatter ? formatter(value, shape, idx) : value,
        fill: style.fill,
        stroke: style.stroke,
        textAlign: 'center',
        textBaseline: 'bottom',
      };
    });
  }

  protected getValue(datum: MappingDatum): number | undefined | null {
    return get(datum._origin, this.layer.options.yField);
  }

  protected getPosition(datum: MappingDatum): { x: number; y: number } {
    return {
      x: isArray(datum.x) ? last(datum.x) : datum.x,
      y: (isArray(datum.y) ? last(datum.y) : datum.y) - DEFAULT_OFFSET,
    };
  }
}

registerLabelComponent('point', PointLabel);
