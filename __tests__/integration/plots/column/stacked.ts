import { G2PlotColumn, G2PlotColumnOptions } from '../../../../src';

export function columnStacked() {
  const options: G2PlotColumnOptions = {
    type: G2PlotColumn,
    data: {
      type: 'fetch',
      value: 'data/year-value-country.json',
    },
    encode: {
      x: 'year',
      y: 'value',
      color: 'country',
    },
    isStack: true,
    labels: [{ text: 'value', position: 'inside' }],
  };
  return {
    type: 'view',
    children: [options],
  };
}
