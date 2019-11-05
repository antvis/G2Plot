import { Line } from '@antv/g2plot';

const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

const linePlot = new Line(document.getElementById('container'), {
  title: {
    visible: true,
    text: '曲线折线图',
  },
  description: {
    visible: true,
    text: '用平滑的曲线代替折线。',
  },
  padding: 'auto',
  forceFit: true,
  data,
  xField: 'year',
  yField: 'value',
  smooth: true,
});

linePlot.render();
