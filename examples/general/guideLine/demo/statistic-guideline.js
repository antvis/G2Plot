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
    text: '统计值图表辅助线',
  },
  description: {
    visible: true,
    text: '统计值辅助线，通过type指定统计数据类型',
  },
  data,
  xField: 'year',
  yField: 'value',
  guideLine: [
    {
      type: 'mean', // 'max' | 'min' | 'median' |  'mean'
      text: {
        position: 'start',
        content: '中位数',
      },
    },
  ],
});

columnPlot.render();
