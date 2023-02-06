import { G2PlotLine } from '../../../src';
import { filterPoint } from './line-series';

export function linePointShape() {
  return {
    type: 'view',
    height: 320,
    children: [
      {
        type: G2PlotLine,
        data: {
          type: 'fetch',
          value: 'data/year-value-category.json',
        },
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
          pointOpacity: (datum, i, data) => filterPoint(data, datum, 'category'),
        },
      },
    ],
  };
}
