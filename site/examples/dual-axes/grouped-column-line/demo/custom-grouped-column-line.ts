import { DualAxes } from '@antv/g2plot';

const uvBillData = [
  { time: '2019-03', value: 350, type: 'uv' },
  { time: '2019-04', value: 900, type: 'uv' },
  { time: '2019-05', value: 300, type: 'uv' },
  { time: '2019-06', value: 450, type: 'uv' },
  { time: '2019-07', value: 470, type: 'uv' },
  { time: '2019-03', value: 220, type: 'bill' },
  { time: '2019-04', value: 300, type: 'bill' },
  { time: '2019-05', value: 250, type: 'bill' },
  { time: '2019-06', value: 220, type: 'bill' },
  { time: '2019-07', value: 362, type: 'bill' },
];

const transformData = [
  { time: '2019-03', count: 800 },
  { time: '2019-04', count: 600 },
  { time: '2019-05', count: 400 },
  { time: '2019-06', count: 380 },
  { time: '2019-07', count: 220 },
];

const dualAxes = new DualAxes('container', {
  data: [uvBillData, transformData],
  xField: 'time',
  yField: ['value', 'count'],
  geometryOptions: [
    {
      geometry: 'column',
      isGroup: true,
      seriesField: 'type',
      columnWidthRatio: 0.4,
      label: {},
      color: ['#5B8FF9', '#5D7092'],
    },
    {
      geometry: 'line',
      color: '#5AD8A6',
    },
  ],
  legend: {
    custom: true,
    position: 'bottom',
    items: [
      {
        value: 'uv',
        name: 'uv',
        marker: { symbol: 'square', style: { fill: '#5B8FF9', r: 5 } },
      },
      {
        value: 'bill',
        name: '账单',
        marker: { symbol: 'square', style: { fill: '#5D7092', r: 5 } },
      },
      {
        value: 'count',
        name: '数值',
        marker: { symbol: 'square', style: { fill: '#5AD8A6', r: 5 } },
      },
    ],
  },
});

dualAxes.render();
