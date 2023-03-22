import { Line } from '../../../src';

export function lineArea(container, renderer) {
  return new Line(container, {
    type: 'view',
    height: 320,
    renderer,
    interactions: [{ type: 'tooltip' }],
    data: {
      type: 'fetch',
      value: 'data/year-value-category.json',
    },
    axis: { y: { title: false } },
    encode: {
      x: (d) => new Date(d.year),
      y: 'value',
      color: 'category',
    },
    transform: [{ type: 'stackY' }],
    scale: { x: { mask: 'YYYY-MM', nice: true } },
    children: [
      {
        type: 'area',
      },
      {
        type: 'line',
      },
    ],
  });
}
