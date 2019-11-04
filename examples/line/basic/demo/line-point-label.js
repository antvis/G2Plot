import { Line } from '@antv/g2plot';

const data = [
  {
    year: '1991',
    value: 3,
  },
  {
    year: '1992',
    value: 4,
  },
  {
    year: '1993',
    value: 3.5,
  },
  {
    year: '1994',
    value: 5,
  },
  {
    year: '1995',
    value: 4.9,
  },
  {
    year: '1996',
    value: 6,
  },
  {
    year: '1997',
    value: 7,
  },
  {
    year: '1998',
    value: 9,
  },
  {
    year: '1999',
    value: 13,
  },
];

const linePlot = new Line(document.getElementById('container'), {
  title: {
    visible: true,
    text: '折线图-数据点label',
  },
  description: {
    visible: true,
    text: '为折线上的每一个数据点添加图形标签。',
  },
  padding: 'auto',
  forceFit: true,
  data,
  xField: 'year',
  yField: 'value',
  label: {
    visible: true,
    type: 'point',
  },
});

linePlot.render();
