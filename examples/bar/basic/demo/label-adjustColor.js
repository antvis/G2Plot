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
    text: '基础条形图 - 图形标签颜色自适应',
  },
  description: {
    visible: true,
    text:
      '图形标签(label)的adjustColor配置项默认设置为true，位于柱形的内部的label颜色会根据柱形颜色自动调整，保证可读性。',
  },
  data,
  xField: 'sales',
  yField: 'year',
  colorField: 'year',
  color: ['#55A6F3', '#CED4DE', '#55A6F3', '#55A6F3', '#55A6F3'],
  label: {
    visible: true,
    position: 'middle', // options: left / middle / right
    adjustColor: true,
  },
});

barPlot.render();
