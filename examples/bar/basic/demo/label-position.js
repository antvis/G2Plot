import { Bar } from '@antv/g2plot';

const data = [
  { year: '1951 年', sales: 38, category: 'A' },
  { year: '1952 年', sales: 52, category: 'A' },
  { year: '1956 年', sales: 61, category: 'A' },
  { year: '1957 年', sales: 145, category: 'A' },
  { year: '1958 年', sales: 48, category: 'B' },
];

const barPlot = new Bar(document.getElementById('container'), {
  forceFit: true,
  title: {
    visible: true,
    text: '基础条形图 - 图形标签位置',
  },
  description: {
    visible: true,
    text: '条形图的图形标签位置可以指定为left-左对齐，middle-图形中心，bottom-图形右侧。',
  },
  data,
  xField: 'sales',
  yField: 'year',
  label: {
    visible: true,
    position: 'middle', // options: left / middle / right
  },
});

barPlot.render();
