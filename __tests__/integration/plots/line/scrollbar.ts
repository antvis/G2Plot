import { G2PlotLine } from '../../../../src';

export function lineScrollbar() {
  return {
    type: 'view',
    height: 320,
    paddingLeft: 80,
    children: [
      {
        type: G2PlotLine,
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
  };
}

lineScrollbar.skip = true;
