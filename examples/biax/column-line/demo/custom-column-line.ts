import { Biax } from '@antv/g2plot';

const data = [
  { time: '2019-03', value: 350, count: 800 },
  { time: '2019-04', value: 900, count: 600 },
  { time: '2019-05', value: 300, count: 400 },
  { time: '2019-06', value: 450, count: 380 },
  { time: '2019-07', value: 470, count: 220 },
];

const biaxChart = new Biax('container', {
  data: [data, data],
  xField: 'time',
  yField: ['value', 'count'],
  yAxis: [
    {
      min: 0,
    },
    {
      min: 0,
      label: {
        formatter: (val) => `${val}个`,
      },
    },
  ],
  meta: {
    value: {
      formatter: (val) => `${val / 100}%`,
    },
  },
  geometryConfigs: [
    {
      geometry: 'column',
      color: '#586bce',
      columnWidthRatio: 0.4,
      columnStyle: {
        opacity: 0.4,
      },
      label: {
        position: 'middle',
      },
    },
    {
      geometry: 'line',
      color: '#29cae4',
    },
  ],
  interactions: [
    {
      name: 'element-highlight',
    },
  ],
});

biaxChart.render();
