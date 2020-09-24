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

const dualAxesChart = new DualAxes('container', {
  data: [transformData, uvData],
  xField: 'time',
  yField: ['count', 'value'],
  geometryOptions: [
    {
      geometry: 'line',
      seriesField: 'name',
      color: ['#93D072', '#D62A0D', '#FAA219'],
      lineStyle: ({ name }) => {
        if (name === 'a') {
          return {
            lineDash: [2, 2],
            opacity: 1,
          };
        }
        return {
          opacity: 0.5,
        };
      },
    },
    {
      geometry: 'column',
      color: '#586bce',
      columnWidthRatio: 0.4,
      columnStyle: {
        opacity: 0.4,
      },
    },
  ],
});

dualAxesChart.render();
