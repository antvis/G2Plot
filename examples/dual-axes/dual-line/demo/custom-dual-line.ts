import { DualAxes } from '@antv/g2plot';

const data = [
  { year: '1991', value: 3, count: 10 },
  { year: '1992', value: 4, count: 4 },
  { year: '1993', value: 3.5, count: 5 },
  { year: '1994', value: 5, count: 5 },
  { year: '1995', value: 4.9, count: 4.9 },
  { year: '1996', value: 6, count: 35 },
  { year: '1997', value: 7, count: 7 },
  { year: '1998', value: 9, count: 1 },
  { year: '1999', value: 13, count: 20 },
];

const dualAxesChart = new DualAxes('container', {
  data: [data, data],
  xField: 'year',
  yField: ['value', 'count'],
  geometryOptions: [
    {
      geometry: 'line',
      smooth: false,
      color: '#29cae4',
      lineStyle: {
        lineWidth: 3,
        lineDash: [5, 5],
      },
    },
    {
      geometry: 'line',
      smooth: true,
      color: '#586bce',
      lineStyle: {
        lineWidth: 4,
        opacity: 0.5,
      },
      label: {},
      point: {
        shape: 'circle',
        size: 4,
        style: {
          opacity: 0.5,
          stroke: '#586bce',
          fill: '#fff',
        },
      },
    },
  ],
});

dualAxesChart.render();
