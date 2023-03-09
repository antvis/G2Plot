import { Line } from '../../../src';

export function linePointShape(container, renderer = 'canvas') {
  return new Line(container, {
    renderer,
    type: 'view',
    height: 320,
    data: {
      type: 'fetch',
      value: 'data/year-value-category.json',
    },

    children: [
      {
        type: 'line',
        axis: { y: { title: false } },
        encode: {
          x: (d) => new Date(d.year),
          y: 'value',
          color: 'category',
        },
        scale: {
          x: { mask: 'YYYY-MM', nice: true },
          pointShape: {
            domain: ['primary', 'second'],
            range: ['point', 'square'],
          },
        },
      },
      {
        type: 'point',
        encode: {
          x: (d) => new Date(d.year),
          y: 'value',
          color: 'category',
          shape: (d) => (d.category !== 'Gas fuel' ? 'primary' : 'second'),
        },
      },
    ],
  });
}
