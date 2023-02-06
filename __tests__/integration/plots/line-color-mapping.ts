import { G2PlotLine } from '../../../src';

export function lineColorMapping() {
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
  };
}
