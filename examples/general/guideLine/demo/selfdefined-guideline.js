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
    text: '自定义图表辅助线',
  },
  description: {
    visible: true,
    text: '通过start和end自定义辅助线，支持传入位置百分比或数据',
  },
  data,
  xField: 'year',
  yField: 'value',
  guideLine: [
    {
      start: ['0%', '50%'], // ['1991', 30],
      end: ['100%', '50%'], // ['1999', 30],
      text: {
        position: 'start',
        content: '自定义位置辅助线',
      },
    },
  ],
});

columnPlot.render();
