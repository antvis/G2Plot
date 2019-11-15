// 基础柱状图label颜色自动调整

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
  color: '#2C225B',
  label: {
    visible: true,
    position: 'middle',
    adjustColor: true,
  },
});
columnPlot.render();

// 作为模块 避免变量冲突
export {};
