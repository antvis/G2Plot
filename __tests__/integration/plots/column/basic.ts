import { G2PlotColumn, G2PlotColumnOptions } from '../../../../src';

export function columnBasic() {
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
  };
  return {
    type: 'view',
    children: [options],
  };
}
