import { DualAxes } from '@antv/g2plot';

const uvData = [
  { time: '2019-03', value: 35 },
  { time: '2019-04', value: 90 },
  { time: '2019-05', value: 30 },
  { time: '2019-06', value: 45 },
  { time: '2019-07', value: 47 },
];

const transformData = [
  { time: '2019-03', count: 800, name: 'a' },
  { time: '2019-04', count: 600, name: 'a' },
  { time: '2019-05', count: 400, name: 'a' },
  { time: '2019-06', count: 380, name: 'a' },
  { time: '2019-07', count: 220, name: 'a' },
  { time: '2019-03', count: 750, name: 'b' },
  { time: '2019-04', count: 650, name: 'b' },
  { time: '2019-05', count: 450, name: 'b' },
  { time: '2019-06', count: 400, name: 'b' },
  { time: '2019-07', count: 320, name: 'b' },
  { time: '2019-03', count: 900, name: 'c' },
  { time: '2019-04', count: 600, name: 'c' },
  { time: '2019-05', count: 450, name: 'c' },
  { time: '2019-06', count: 300, name: 'c' },
  { time: '2019-07', count: 200, name: 'c' },
];

const dualAxes = new DualAxes('container', {
  data: [uvData, transformData],
  xField: 'time',
  yField: ['value', 'count'],
  geometryOptions: [
    {
      geometry: 'column',
      color: '#5B8FF9',
      columnWidthRatio: 0.4,
    },
    {
      geometry: 'line',
      seriesField: 'name',
      color: ['#CDDDFD', '#CDF3E4', '#CED4DE'],
    },
  ],
});

dualAxes.render();
