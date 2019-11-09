// 配置折线数据点样式

const data = [
  {
    year: '1991',
    value: 3,
  },
  {
    year: '1992',
    value: 4,
  },
  {
    year: '1993',
    value: 3.5,
  },
  {
    year: '1994',
    value: 5,
  },
  {
    year: '1995',
    value: 4.9,
  },
  {
    year: '1996',
    value: 6,
  },
  {
    year: '1997',
    value: 7,
  },
  {
    year: '1998',
    value: 9,
  },
  {
    year: '1999',
    value: 13,
  },
];

const linePlot = new g2plot.Line(document.getElementById('canvas'), {
  padding: 'auto',
  data,
  xField: 'year',
  yField: 'value',
  point: {
    visible: true,
    size: 5,
    shape: 'diamond',
    style: {
      fill: 'white',
      stroke: '#2593fc',
      lineWidth: 2,
    },
  },
});
linePlot.render();

// 作为模块 避免变量冲突
export {}
