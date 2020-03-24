import { Line } from '@antv/g2plot';

const data = [
  { date: '2019-01-01', value: 3 },
  { date: '2019-02-01', value: 4 },
  { date: '2019-03-01', value: 3.5 },
  { date: '2019-04-01', value: 5 },
  { date: '2019-05-01', value: 4.9, festival: '劳动节' },
  { date: '2019-06-01', value: 6 },
  { date: '2019-07-01', value: 7 },
  { date: '2019-08-01', value: 9 },
  { date: '2019-09-01', value: -7, error: '异常' },
  { date: '2019-10-01', value: 13, festival: '国庆节' },
  { date: '2019-11-01', value: 13 },
  { date: '2019-12-01', value: 13 },
];

const linePlot = new Line(document.getElementById('container'), {
  title: {
    visible: true,
    text: '多种类型标注点',
  },
  description: {
    visible: true,
    text: '在折线图上标注重点的数据，如节假日、异常点等',
  },
  forceFit: true,
  padding: 'auto',
  data,
  xField: 'date',
  yField: 'value',
  yAxis: {
    nice: true,
  },
  label: {
    visible: false,
  },
  markerPoints: [
    {
      visible: true,
      data: [{ date: '2019-05-01', value: 4.9 }, { date: '2019-10-01' }],
      label: {
        visible: true,
        field: 'festival',
      },
    },
    {
      visible: true,
      data: [{ date: '2019-09-01' }],
      symbol: 'cross',
      label: {
        visible: true,
        field: 'error',
        position: 'bottom',
        offsetY: 8,
      },
      style: {
        normal: { stroke: 'rgba(255, 0, 0, 0.65)', lineWidth: 2 },
      },
    },
  ],
});

linePlot.render();
