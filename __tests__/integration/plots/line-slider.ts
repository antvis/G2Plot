import { Line } from '../../../src';

export function lineSlider(container, renderer = 'canvas') {
  return new Line(container, {
    renderer,
    type: 'view',
    height: 320,
    children: [
      {
        type: 'line',
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
        slider: { x: {}, y: {} },
      },
    ],
  });
}
