import { Line } from '../../../src';

export function lineSeries(container, renderer) {
  return new Line(container, {
    renderer,
    type: 'view',
    height: 320,
    interactions: [{ type: 'tooltip' }],
    data: {
      type: 'fetch',
      value: 'data/year-value-category.json',
    },
    children: [
      {
        type: 'line',

        encode: {
          x: (d) => new Date(d.year),
          y: 'value',
          color: 'category',
        },
        scale: { x: { mask: 'YYYY-MM', nice: true } },
        axis: { y: { title: false } },
      },
      {
        type: 'point',
        encode: {
          x: (d) => new Date(d.year),
          y: 'value',
          color: 'category',
        },
        style: {
          point: true,
          pointOpacity: (datum, i, data) => filterPoint(data, datum, 'category'),
        },
      },
    ],
  });
}

export function filterPoint(data, datum, name) {
  const idx = data.filter((d) => d[name] === datum[name]).findIndex((d) => d === datum);
  // Display every 5 points.
  return idx % 5 ? 0 : 1;
}
