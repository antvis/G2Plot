import { DualAxes } from '@antv/g2plot';

const columnData = [
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
  { name: 'beijing', month: 'Feb.', value: 42.4, type: '高数' },
  { name: 'London', month: 'Mar.', value: 2.9, type: '语文' },
  { name: 'London', month: 'Mar.', value: 5.9, type: '数学' },
  { name: 'Berlin', month: 'Mar.', value: 22.4, type: '美术' },
  { name: 'Berlin', month: 'Mar.', value: 32.4, type: '线性代数' },
  { name: 'beijing', month: 'Mar.', value: 42.4, type: '高数' },
];

const lineData = [
  { name: '福老师', month: 'Jan.', value: 12.9, type: '美术' },
  { name: '逍老师', month: 'Jan.', value: 1.4, type: '线性代数' },
  { name: '新老师', month: 'Jan.', value: 2.4, type: '高数' },
  { name: '福老师', month: 'Feb.', value: 18.9, type: '美术' },
  { name: '逍老师', month: 'Feb.', value: 13.4, type: '线性代数' },
  { name: '新老师', month: 'Feb.', value: 15.4, type: '高数' },
  { name: '福老师', month: 'Mar.', value: 8.9, type: '美术' },
  { name: '逍老师', month: 'Mar.', value: 6.4, type: '线性代数' },
  { name: '新老师', month: 'Mar.', value: 5.4, type: '高数' },
];

const dualAxes = new DualAxes('container', {
  data: [columnData, lineData],
  xField: 'month',
  yField: ['value', 'value'],
  geometryOptions: [
    {
      geometry: 'column',
      isGroup: true,
      isStack: true,
      seriesField: 'type',
      groupField: 'name',
    },
    {
      geometry: 'line',
      seriesField: 'name',
      isStack: true,
      smooth: true,
      color: ['#BBDEDE', '#FF99C3', '#FFE0ED'],
    },
  ],
  tooltip: false,
});

dualAxes.render();
