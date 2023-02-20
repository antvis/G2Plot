import { G2PlotColumn, G2PlotColumnOptions } from '../../../../src';

export function columnBackground() {
  const options: G2PlotColumnOptions = {
    type: G2PlotColumn,
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    encode: {
      x: 'letter',
      y: 'frequency',
    },
    scale: { x: { paddingInner: 0.2 } },
    axis: { y: { labelFormatter: '.0%' } },
    style: { background: true },
  };
  return {
    type: 'view',
    children: [options],
  };
}
