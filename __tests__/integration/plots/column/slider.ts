import { G2PlotColumn, G2PlotColumnOptions } from '../../../../src';

export function columnSlider() {
  const options: G2PlotColumnOptions = {
    type: G2PlotColumn,
    data: {
      type: 'fetch',
      value: 'data/city-sales.json',
    },
    encode: {
      x: 'city',
      y: 'sales',
    },
    slider: { x: {} },
  };
  return {
    type: 'view',
    children: [options],
  };
}
