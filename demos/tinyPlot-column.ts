// 迷你图表-柱状图

const data = [
  {
    year: '1991',
    value: 31,
  },
  {
    year: '1992',
    value: 41,
  },
  {
    year: '1993',
    value: 35,
  },
  {
    year: '1994',
    value: 55,
  },
  {
    year: '1995',
    value: 49,
  },
  {
    year: '1996',
    value: 15,
  },
  {
    year: '1997',
    value: 17,
  },
  {
    year: '1998',
    value: 29,
  },
  {
    year: '1999',
    value: 33,
  },
];

const tinyColumn = new g2plot.TinyColumn(document.getElementById('canvas'), {
  width: 200,
  height: 100,
  data,
  xField: 'year',
  yField: 'value',
  // color: '#53C3C5',
  // columnStyle: { stroke:'grey'}
});
tinyColumn.render();

// 作为模块 避免变量冲突
export {}
