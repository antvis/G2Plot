import { Column } from '@antv/g2plot';

const data = [
  { name: 'London', month: 'Jan.', value: 12.9, type: '语文' },
  { name: 'London', month: 'Jan.', value: 10.9, type: '数学' },
  { name: 'London', month: 'Jan.', value: 120.9, type: '英语' },
  { name: 'Berlin', month: 'Jan.', value: 12.4, type: '美术' },
  { name: 'Berlin', month: 'Jan.', value: 12.4, type: '线性代数' },
  { name: 'beijing', month: 'Jan.', value: 12.4, type: '高数' },
  { name: 'London', month: 'Feb.', value: 2.9, type: '语文' },
  { name: 'London', month: 'Feb.', value: 5.9, type: '数学' },
  { name: 'London', month: 'Feb.', value: 10.9, type: '英语' },
  { name: 'Berlin', month: 'Feb.', value: 22.4, type: '美术' },
  { name: 'Berlin', month: 'Feb.', value: 32.4, type: '线性代数' },
  { name: 'Berlin', month: 'Feb.', value: 62.4, type: '线性代数-上' },
  { name: 'beijing', month: 'Feb.', value: 42.4, type: '高数' },
  { name: 'London', month: 'wed.', value: 2.9, type: '语文' },
  { name: 'London', month: 'wed.', value: 5.9, type: '数学' },
  { name: 'Berlin', month: 'wed.', value: 22.4, type: '美术' },
  { name: 'Berlin', month: 'wed.', value: 32.4, type: '线性代数' },
  { name: 'beijing', month: 'wed.', value: 42.4, type: '高数' },
  { name: 'beijing', month: 'wed.', value: 42.4, type: '高数-上' },
];

const dualAxes = new Column('container', {
  data,
  xField: 'month',
  yField: 'value',
  isGroup: true,
  isStack: true,
  seriesField: 'type',
  groupField: 'name',
  tooltip: false,
});

dualAxes.render();
