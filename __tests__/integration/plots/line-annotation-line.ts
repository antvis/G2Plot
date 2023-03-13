import { Line } from '../../../src';

export function lineAnnotationLine(container, renderer = 'canvas') {
  return new Line(container, {
    renderer,
    type: 'view',
    height: 320,
    encode: {
      x: (d) => new Date(d.Date),
      y: 'scales',
    },
    children: [
      {
        type: 'line',
        data: {
          type: 'fetch',
          value: 'data/date-scales.json',
        },
        scale: { x: { mask: 'YYYY-MM', nice: true } },
        axis: { y: { size: 50 } },
      },
      {
        type: 'lineX',
        data: [{ Date: '2012-01' }],
      },
    ],
  });
}
