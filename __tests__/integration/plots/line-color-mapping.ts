import { Line } from '../../../src';

export function lineColorMapping(container, renderer) {
  return new Line(container, {
    renderer,
    type: 'view',
    height: 320,
    children: [
      {
        type: 'line',
        data: {
          type: 'fetch',
          value: 'data/year-value-category.json',
        },
        encode: {
          x: (d) => new Date(d.year),
          y: 'value',
          color: 'category',
        },
        scale: {
          x: { mask: 'YYYY-MM', nice: true },
          color: {
            relations: [['Gas fuel', 'red']],
          },
        },
        axis: { y: { title: false } },
        labels: [{ text: 'category', selector: 'last' }],
      },
    ],
  });
}
