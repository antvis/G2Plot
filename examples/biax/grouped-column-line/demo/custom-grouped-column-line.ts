import { Biax } from '@antv/g2plot';

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

const biaxChart = new Biax('container', {
  data: [uvBillData, transformData],
  xField: 'time',
  yField: ['value', 'count'],
  geometryConfigs: [
    {
      geometry: 'column',
      isGroup: true,
      groupField: 'type',
      columnWidthRatio: 0.4,
    },
    {
      geometry: 'line',
      color: '#FAA219',
    },
  ],
});

biaxChart.render();
