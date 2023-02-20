import { G2PlotColumn, G2PlotColumnOptions } from '../../../../src';

export function columnGrouped() {
  const options: G2PlotColumnOptions = {
    type: G2PlotColumn,
    data: {
      type: 'fetch',
      value: 'data/whether.json',
    },
    encode: {
      x: '月份',
      y: '月均降雨量',
      color: 'name',
    },
    isGroup: true,
    labels: [{ text: '月均降雨量', position: 'inside' }],
  };
  return {
    type: 'view',
    children: [options],
  };
}
