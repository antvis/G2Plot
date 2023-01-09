import { G2PlotLine } from '../../../src';
import { filterPoint } from './line-series';

export function linePointShape() {
  return {
    type: 'view',
    height: 320,
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json',
    },
    children: [
      {
        type: G2PlotLine,
        encode: {
          x: (d) => new Date(d.year),
          y: 'value',
          color: 'category',
          pointShape: (d) => (d.category !== 'Gas fuel' ? 'primary' : 'second'),
        },
        axis: { y: { title: false } },
        scale: {
          x: { mask: 'YYYY-MM', nice: true },
          pointShape: {
            domain: ['primary', 'second'],
            range: ['point', 'square'],
          },
        },
        style: {
          point: true,
          pointOpacity: (datum, i, data) =>
            filterPoint(data, datum, 'category'),
        },
      },
    ],
  };
}
