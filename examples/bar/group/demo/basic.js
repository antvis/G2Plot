import { GroupBar } from '@antv/g2plot';

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
];

const barPlot = new GroupBar(document.getElementById('container'), {
  title: {
    visible: true,
    text: '分组条形图',
  },
  data,
  xField: 'value',
  yField: 'year',
  yAxis: {
    min: 0,
  },
  groupField: 'type',
});

barPlot.render();
