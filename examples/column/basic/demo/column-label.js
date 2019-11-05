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
    text: '基础柱状图-图形标签',
  },
  description: {
    visible: true,
    text: '基础柱状图图形标签默认位置在柱形上部。',
  },
  forceFit: true,
  data,
  padding: 'auto',
  data,
  xField: 'year',
  yField: 'sales',
  label: {
    visible: true,
    style: {
      fill: '#0D0E68',
      fontSize: 12,
      fontWeight: 600,
      opacity: 0.6,
    },
  },
});

columnPlot.render();
