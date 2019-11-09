// 基础柱状图 - 颜色映射

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

const columnPlot = new g2plot.Column(document.getElementById('canvas'), {
  width: 600,
  height: 600,
  padding: 'auto',
  data,
  xField: 'year',
  yField: 'sales',
  colorField: 'year',
  color: ['#c43a22', '#e86e3e', '#f6ad5b', '#f0e086', '#f9fab8', '#d9e882', '#a7d268', '#70b65e', '#169437'],
});
columnPlot.render();

// 作为模块 避免变量冲突
export {}
