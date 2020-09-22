import { DualAxes, G2 } from '@antv/g2plot';

const { registerTheme } = G2;

registerTheme('custom-theme', {
  colors10: ['#FACDAA', '#F4A49E', '#EE7B91', '#E85285', '#BE408C', '#BE408C'],
  /** 20色板 */
  colors20: ['#FACDAA', '#F4A49E', '#EE7B91', '#E85285', '#BE408C', '#BE408C', '#942D93'],
});

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

const dualAxesChart = new DualAxes('container', {
  data: [uvBillData, transformData],
  xField: 'time',
  yField: ['value', 'count'],
  geometryOptions: [
    {
      geometry: 'column',
      isStack: true,
      seriesField: 'type',
      columnWidthRatio: 0.4,
      label: {},
    },
    {
      geometry: 'line',
      color: '#FAA219',
    },
  ],
  legend: {
    marker: {
      symbol: 'circle',
      style: {
        lineWidth: 2,
        r: 6,
        stroke: '#FAA219',
        fill: '#fff',
      },
    },
    layout: 'vertical',
    position: 'right',
  },
  interactions: [
    {
      type: 'element-highlight',
    },
    {
      type: 'active-region',
    },
  ],
  animation: false,
  theme: 'custom-theme',
});

dualAxesChart.render();
