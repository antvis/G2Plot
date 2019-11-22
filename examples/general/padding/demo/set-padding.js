import { Column } from '@antv/g2plot';

const data = [
  {
    year: '1991',
    value: 31,
  },
  {
    year: '1992',
    value: 41,
  },
  {
    year: '1993',
    value: 35,
  },
  {
    year: '1994',
    value: 55,
  },
  {
    year: '1995',
    value: 49,
  },
  {
    year: '1996',
    value: 15,
  },
  {
    year: '1997',
    value: 17,
  },
  {
    year: '1998',
    value: 29,
  },
  {
    year: '1999',
    value: 33,
  },
];

const columnPlot = new Column(document.getElementById('container'), {
  title: {
    visible: true,
    text: '手动设置图表内边距',
  },
  description: {
    visible: true,
    text: 'G2Plot图表默认自动计算图表内边距，但用户可以通过padding配置项手动设置。',
  },
  data,
  xField: 'year',
  yField: 'value',
  padding: [100, 100, 100, 100],
});

columnPlot.render();
