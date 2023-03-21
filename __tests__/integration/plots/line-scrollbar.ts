import { Line } from '../../../src';

export function lineScrollbar(container, renderer) {
  return new Line(container, {
    renderer,
    type: 'view',
    height: 320,
    paddingLeft: 80,
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
        scrollbar: { x: {}, y: {} },
      },
    ],
  });
}

lineScrollbar.skip = true;
