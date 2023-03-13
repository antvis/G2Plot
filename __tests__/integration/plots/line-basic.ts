import { Line } from '../../../src';

export function lineBasic(container, renderer = 'canvas') {
  return new Line(container, {
    renderer,
    data: {
      type: 'fetch',
      value: 'data/date-scales.json',
    },
    encode: {
      x: (d) => new Date(d.Date),
      y: 'scales',
    },
    scale: { x: { mask: 'YYYY-MM', nice: true } },
    axis: { y: { size: 50 } },
  });
}
