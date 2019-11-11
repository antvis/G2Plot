import { Bar } from '@antv/g2plot';

const data = [
  { year: '1951 年', sales: 38, category: 'A' },
  { year: '1952 年', sales: 52, category: 'A' },
  { year: '1956 年', sales: 61, category: 'A' },
  { year: '1957 年', sales: 145, category: 'A' },
  { year: '1958 年', sales: 48, category: 'B' },
];

const barPlot = new Bar(document.getElementById('container'), {
  title: {
    visible: true,
    text: '基础条形图',
  },
  forceFit: true,
  data,
  xField: 'sales',
  yField: 'year',
});

barPlot.render();
