import { G2PlotLine } from '../../../../src';

export function lineArea() {
  return {
    type: 'view',
    height: 320,
    interactions: [{ type: 'tooltip' }],
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
        isStack: true,
        scale: { x: { mask: 'YYYY-MM', nice: true } },
        axis: { y: { title: false } },
        style: { point: false, area: true },
      },
    ],
  };
}
