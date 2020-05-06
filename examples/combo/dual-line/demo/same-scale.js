import { DualLine } from '@antv/g2plot';

const data1 = [
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

const data2 = [
  { year: '1991', count: 10 },
  { year: '1992', count: 4 },
  { year: '1993', count: 5 },
  { year: '1994', count: 5 },
  { year: '1995', count: 4.9 },
  { year: '1996', count: 35 },
  { year: '1997', count: 7 },
  { year: '1998', count: 1 },
  { year: '1999', count: 20 },
];

const dualLine = new DualLine(document.getElementById('container'), {
  title: {
    visible: true,
    text: '统一双折线度量',
  },
  description: {
    visible: true,
    text: '统一双折线度量，隐藏右轴',
  },
  data: [data1, data2],
  xField: 'year',
  yField: ['value', 'count'],
  yAxis: {
    max: 35,
    rightConfig: {
      visible: false,
    },
  },
});
dualLine.render();
