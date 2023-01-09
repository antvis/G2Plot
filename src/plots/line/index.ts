import { defineMark } from '../../utils/defineMark';
import { defineAnnotation } from '../../utils/defineAnnotation';
import { assignDeep, omitObject, compact } from '../../utils/helper';
import type { LineOptions } from './type';

export type { LineOptions };

export function Line(options: LineOptions) {
  const {
    style = {},
    scale,
    axis,
    legend,
    slider,
    scrollbar,
    labels,
    animate,
    annotations = [],
  } = options;

  const DEFAULT_POINT_OPTIONS = {
    encode: { shape: 'point' },
    style: { stroke: '#fff' },
  };
  const DEFAULT_AREA_OPTIONS = {
    style: { fillOpacity: 0.25 },
  };

  const { point, area } = style;
  const primary = {
    ...defineMark('line', options),
    scale,
    axis: assignDeep({ x: { title: false, size: 20 } }, axis),
    legend,
    slider,
    scrollbar,
    labels,
    animate: omitObject(animate, ['point', 'area']),
    style: omitObject(style, ['point', 'area']),
  };
  return () => {
    const marks = [
      area &&
        assignDeep({}, defineMark('area', options, DEFAULT_AREA_OPTIONS), {
          encode: { tooltip: null, title: null },
        }),
      primary,
      point &&
        assignDeep({}, defineMark('point', options, DEFAULT_POINT_OPTIONS), {
          encode: { tooltip: null, title: null },
        }),
      ...annotations.map((annotation) => defineAnnotation(annotation, options)),
    ];

    return compact(marks);
  };
}

Line.props = { composite: true };
