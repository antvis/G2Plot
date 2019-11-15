import { Column } from '@antv/g2plot';

const data = [
  { year: '1951 年', sales: 38, category: 'A' },
  { year: '1952 年', sales: 52, category: 'A' },
  { year: '1956 年', sales: 61, category: 'A' },
  { year: '1957 年', sales: 145, category: 'A' },
  { year: '1958 年', sales: 48, category: 'B' },
  { year: '1959 年', sales: 38, category: 'B' },
  { year: '1960 年', sales: 38, category: 'B' },
  { year: '1962 年', sales: 38, category: 'B' },
];

const columnPlot = new Column(document.getElementById('container'), {
  title: {
    visible: true,
    text: '基础柱状图label颜色自动调整',
  },
  description: {
    visible: true,
    text:
      '图形标签(label)的adjustColor配置项设置为true时，位于柱形的内部的label颜色会根据柱形颜色自动调整，保证可读性。',
  },
  forceFit: true,
  data,
  padding: 'auto',
  data,
  xField: 'year',
  yField: 'sales',
  colorField: 'year',
  color: ['#55A6F3', '#55A6F3', '#55A6F3', '#CED4DE', '#55A6F3', '#55A6F3', '#55A6F3', '#55A6F3'],
  label: {
    visible: true,
    position: 'middle',
    adjustColor: true,
  },
});

columnPlot.render();
