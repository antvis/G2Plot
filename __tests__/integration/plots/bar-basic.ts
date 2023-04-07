import { Bar } from '../../../src';

export function barBasic(container, renderer) {
  return new Bar(container, {
    renderer,
    data: {
      type: 'fetch',
      value: 'data/letter-frequency.json',
    },
    coordinate: {
      transform: [{ type: 'transpose' }],
    },
    transform: [{ type: 'sortX', reverse: true }],
    encode: {
      x: 'letter',
      y: 'frequency',
    },
    axis: {
      y: { labelFormatter: '.0%' },
    },
    labels: [
      {
        text: 'frequency',
        formatter: '.1%',
        style: {
          textAnchor: (d) => (+d.frequency > 0.008 ? 'right' : 'start'),
          fill: (d) => (+d.frequency > 0.008 ? '#fff' : '#000'),
          dx: (d) => (+d.frequency > 0.008 ? -5 : 5),
        },
      },
    ],
  });
}
