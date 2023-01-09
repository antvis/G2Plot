import { G2PlotLine } from '../../../src';

export function lineArea() {
  return {
    type: 'view',
    height: 320,
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json',
    },
    interactions: [{ type: 'tooltip' }],
    children: [
      {
        type: G2PlotLine,
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
