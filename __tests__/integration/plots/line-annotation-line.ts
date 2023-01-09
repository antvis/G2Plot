import { G2PlotLine } from '../../../src';

export function lineAnnotationLine() {
  return {
    type: 'view',
    height: 320,
    children: [
      {
        type: G2PlotLine,
        data: {
          type: 'fetch',
          value:
            'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json',
        },
        encode: {
          x: (d) => new Date(d.Date),
          y: 'scales',
        },
        scale: { x: { mask: 'YYYY-MM', nice: true } },
        axis: { y: { size: 50 } },
        annotations: [
          {
            type: 'lineX',
            data: [{ Date: '2012-01' }],
          },
        ],
      },
    ],
  };
}
