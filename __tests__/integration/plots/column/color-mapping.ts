import { G2PlotColumn, G2PlotColumnOptions } from '../../../../src';

export function columnColorMapping() {
  const options: G2PlotColumnOptions = {
    type: G2PlotColumn,
    data: [
      { type: '1-3秒', value: 0.16 },
      { type: '4-10秒', value: 0.125 },
      { type: '11-30秒', value: 0.24 },
      { type: '31-60秒', value: 0.19 },
      { type: '1-3分', value: 0.22 },
      { type: '3-10分', value: 0.05 },
      { type: '10-30分', value: 0.01 },
      { type: '30+分', value: 0.015 },
    ],
    encode: {
      x: 'type',
      y: 'value',
      color: (d) => (d.value < 0.05 ? 'lower' : 'normal'),
    },
    scale: {
      color: {
        domain: ['lower', 'normal', 'higher'],
        range: ['#F4664A', '#5B8FF9', '#30bf78'],
      },
    },
  };
  return {
    type: 'view',
    children: [options],
  };
}
