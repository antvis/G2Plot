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
    text: '基础柱状图-颜色映射',
  },
  description: {
    visible: true,
    text: '指定一个分类字段，使柱状图颜色根据类型进行映射。',
  },
  forceFit: true,
  data,
  padding: 'auto',
  data,
  xField: 'year',
  yField: 'sales',
  colorField: 'year',
  color: ['#c43a22', '#e86e3e', '#f6ad5b', '#f0e086', '#f9fab8', '#d9e882', '#a7d268', '#70b65e', '#169437'],
});

columnPlot.render();
