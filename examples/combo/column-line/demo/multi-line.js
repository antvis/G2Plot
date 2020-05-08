import { ColumnLine } from '@antv/g2plot';

const uvData = [
  { time: '2019-03', value: 350 },
  { time: '2019-04', value: 900 },
  { time: '2019-05', value: 300 },
  { time: '2019-06', value: 450 },
  { time: '2019-07', value: 470 },
];

const transformData = [
  { time: '2019-03', count: 800, name: 'a' },
  { time: '2019-04', count: 600, name: 'a' },
  { time: '2019-05', count: 400, name: 'a' },
  { time: '2019-06', count: 380, name: 'a' },
  { time: '2019-07', count: 220, name: 'a' },
  { time: '2019-03', count: 750, name: 'b' },
  { time: '2019-04', count: 650, name: 'b' },
  { time: '2019-05', count: 450, name: 'b' },
  { time: '2019-06', count: 400, name: 'b' },
  { time: '2019-07', count: 320, name: 'b' },
  { time: '2019-03', count: 900, name: 'c' },
  { time: '2019-04', count: 600, name: 'c' },
  { time: '2019-05', count: 450, name: 'c' },
  { time: '2019-06', count: 300, name: 'c' },
  { time: '2019-07', count: 200, name: 'c' },
];

const columnLine = new ColumnLine(document.getElementById('container'), {
  title: {
    visible: true,
    text: '柱线混合图',
    alignTo: 'middle',
  },
  description: {
    visible: true,
    text: '配置多折线',
    alignTo: 'middle',
  },
  data: [uvData, transformData],
  xField: 'time',
  yField: ['value', 'count'],
  lineSeriesField: 'name',
});

columnLine.render();
