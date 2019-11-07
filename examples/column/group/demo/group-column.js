import { GroupColumn } from '@antv/g2plot';

const data = [
  {
    year: '1991',
    value: 3,
    type: 'Lon',
  },
  {
    year: '1992',
    value: 4,
    type: 'Lon',
  },
  {
    year: '1993',
    value: 3.5,
    type: 'Lon',
  },
  {
    year: '1994',
    value: 5,
    type: 'Lon',
  },
  {
    year: '1995',
    value: 4.9,
    type: 'Lon',
  },
  {
    year: '1996',
    value: 6,
    type: 'Lon',
  },
  {
    year: '1997',
    value: 7,
    type: 'Lon',
  },
  {
    year: '1998',
    value: 9,
    type: 'Lon',
  },
  {
    year: '1999',
    value: 13,
    type: 'Lon',
  },
  {
    year: '1991',
    value: 3,
    type: 'Bor',
  },
  {
    year: '1992',
    value: 4,
    type: 'Bor',
  },
  {
    year: '1993',
    value: 3.5,
    type: 'Bor',
  },
  {
    year: '1994',
    value: 5,
    type: 'Bor',
  },
  {
    year: '1995',
    value: 4.9,
    type: 'Bor',
  },
  {
    year: '1996',
    value: 6,
    type: 'Bor',
  },
  {
    year: '1997',
    value: 7,
    type: 'Bor',
  },
  {
    year: '1998',
    value: 9,
    type: 'Bor',
  },
  {
    year: '1999',
    value: 13,
    type: 'Bor',
  },
];

const columnPlot = new GroupColumn(document.getElementById('container'), {
  title: {
    visible: true,
    text: '分组柱状图',
  },
  forceFit: true,
  data,
  xField: 'year',
  yField: 'value',
  yAxis: {
    min: 0,
  },
  groupField: 'type',
});

columnPlot.render();
