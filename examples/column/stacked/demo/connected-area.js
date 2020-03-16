import { StackedColumn } from '@antv/g2plot';

const data = [
  { year: '2006', type: 'redDeliciou', value: 10 },
  { year: '2006', type: 'mcintosh', value: 15 },
  { year: '2006', type: 'oranges', value: 9 },
  { year: '2006', type: 'pears', value: 6 },
  { year: '2007', type: 'redDeliciou', value: 12 },
  { year: '2007', type: 'mcintosh', value: 18 },
  { year: '2007', type: 'oranges', value: 9 },
  { year: '2007', type: 'pears', value: 4 },
  { year: '2008', type: 'redDeliciou', value: 5 },
  { year: '2008', type: 'mcintosh', value: 20 },
  { year: '2008', type: 'oranges', value: 8 },
  { year: '2008', type: 'pears', value: 2 },
  { year: '2009', type: 'redDeliciou', value: 1 },
  { year: '2009', type: 'mcintosh', value: 15 },
  { year: '2009', type: 'oranges', value: 5 },
  { year: '2009', type: 'pears', value: 4 },
  { year: '2010', type: 'redDeliciou', value: 2 },
  { year: '2010', type: 'mcintosh', value: 10 },
  { year: '2010', type: 'oranges', value: 4 },
  { year: '2010', type: 'pears', value: 2 },
  { year: '2011', type: 'redDeliciou', value: 3 },
  { year: '2011', type: 'mcintosh', value: 12 },
  { year: '2011', type: 'oranges', value: 6 },
  { year: '2011', type: 'pears', value: 3 },
  { year: '2012', type: 'redDeliciou', value: 4 },
  { year: '2012', type: 'mcintosh', value: 15 },
  { year: '2012', type: 'oranges', value: 8 },
  { year: '2012', type: 'pears', value: 1 },
  { year: '2013', type: 'redDeliciou', value: 6 },
  { year: '2013', type: 'mcintosh', value: 11 },
  { year: '2013', type: 'oranges', value: 9 },
  { year: '2013', type: 'pears', value: 4 },
  { year: '2014', type: 'redDeliciou', value: 10 },
  { year: '2014', type: 'mcintosh', value: 13 },
  { year: '2014', type: 'oranges', value: 9 },
  { year: '2014', type: 'pears', value: 5 },
];

const columnPlot = new StackedColumn(document.getElementById('container'), {
  forceFit: true,
  title: {
    visible: true,
    text: '区域联通组件',
  },
  description: {
    visible: true,
    text: '联通区域组件通过绘制同一字段的联通区域提供视觉上的辅助识别,方便进行数据对比。',
  },
  padding: 'auto',
  data,
  xField: 'year',
  yField: 'value',
  stackField: 'type',
  color: ['#ae331b', '#f27957', '#dadada', '#609db7', '#1a6179'],
  yAxis: {
    min: 0,
  },
  label: {
    visible: false,
  },
  connectedArea: {
    visible: true,
    triggerOn: false,
  },
});

columnPlot.render();
