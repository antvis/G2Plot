// 堆叠柱状图 - 联通区域组件

const data = [
  { year: '2006', type: 'redDeliciou', value: 10 },
  { year: '2006', type: 'mcintosh', value: 15 },
  { year: '2006', type: 'oranges', value: 9 },
  { year: '2006', type: 'pears', value: 6 },
  { year: '2007', type: 'redDeliciou', value: 12 },
  { year: '2007', type: 'mcintosh', value: 18 },
  { year: '2007', type: 'oranges', value: 9 },
  { year: '2007', type: 'pears', value: 4 },
  { year: '2008', type: 'redDeliciou', value: 5 },
  { year: '2008', type: 'mcintosh', value: 20 },
  { year: '2008', type: 'oranges', value: 8 },
  { year: '2008', type: 'pears', value: 2 },
  { year: '2009', type: 'redDeliciou', value: 1 },
  { year: '2009', type: 'mcintosh', value: 15 },
  { year: '2009', type: 'oranges', value: 5 },
  { year: '2009', type: 'pears', value: 4 },
  { year: '2010', type: 'redDeliciou', value: 2 },
  { year: '2010', type: 'mcintosh', value: 10 },
  { year: '2010', type: 'oranges', value: 4 },
  { year: '2010', type: 'pears', value: 2 },
  { year: '2011', type: 'redDeliciou', value: 3 },
  { year: '2011', type: 'mcintosh', value: 12 },
  { year: '2011', type: 'oranges', value: 6 },
  { year: '2011', type: 'pears', value: 3 },
  { year: '2012', type: 'redDeliciou', value: 4 },
  { year: '2012', type: 'mcintosh', value: 15 },
  { year: '2012', type: 'oranges', value: 8 },
  { year: '2012', type: 'pears', value: 1 },
  { year: '2013', type: 'redDeliciou', value: 6 },
  { year: '2013', type: 'mcintosh', value: 11 },
  { year: '2013', type: 'oranges', value: 9 },
  { year: '2013', type: 'pears', value: 4 },
  { year: '2014', type: 'redDeliciou', value: 10 },
  { year: '2014', type: 'mcintosh', value: 13 },
  { year: '2014', type: 'oranges', value: 9 },
  { year: '2014', type: 'pears', value: 5 },
];
const columnPlot = new g2plot.StackColumn(document.getElementById('canvas'), {
  title: {
    text: '堆叠柱状图：联通区域组件',
  },
  description: {
    text: '配置联通区域组件的视觉样式',
  },
  padding: 'auto',
  data,
  xField: 'year',
  yField: 'value',
  yAxis: {
    min: 0,
  },
  stackField: 'type',
  connectedArea: {
    visible: true,
    lineStyle: {
      stroke: '#afb1b5',
      opacity: 0.8,
    },
    areaStyle: {
      fill: '#e8e8e8',
      opacity: 0.5,
    },
  },
});
columnPlot.render();

// 作为模块 避免变量冲突
export {};
