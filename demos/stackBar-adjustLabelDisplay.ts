// 堆叠条形图 - label自动隐藏

const data = [
  {
    year: '1991',
    value: 3,
    type: 'Lon',
  },
  {
    year: '1992',
    value: 4,
    type: 'Lon',
  },
  {
    year: '1993',
    value: 3.5,
    type: 'Lon',
  },
  {
    year: '1994',
    value: 0.5,
    type: 'Lon',
  },
  {
    year: '1995',
    value: 4.9,
    type: 'Lon',
  },
  {
    year: '1996',
    value: 6,
    type: 'Lon',
  },
  {
    year: '1997',
    value: 7,
    type: 'Lon',
  },
  {
    year: '1998',
    value: 9,
    type: 'Lon',
  },
  {
    year: '1999',
    value: 13,
    type: 'Lon',
  },
  {
    year: '1991',
    value: 0.3,
    type: 'Bor',
  },
  {
    year: '1992',
    value: 4,
    type: 'Bor',
  },
  {
    year: '1993',
    value: 3.5,
    type: 'Bor',
  },
  {
    year: '1994',
    value: 5,
    type: 'Bor',
  },
  {
    year: '1995',
    value: 4.9,
    type: 'Bor',
  },
  {
    year: '1996',
    value: 6,
    type: 'Bor',
  },
  {
    year: '1997',
    value: 7,
    type: 'Bor',
  },
  {
    year: '1998',
    value: 9,
    type: 'Bor',
  },
  {
    year: '1999',
    value: 13,
    type: 'Bor',
  },
];

const barPlot = new g2plot.StackBar(document.getElementById('canvas'), {
  title: {
    text: '堆叠条形图：label自动隐藏',
  },
  description: {
    text:
      '在堆叠条形图中，如果label的位置被设定为middle，即显示在条形中间。在对应形状大小不够摆放label的情况下，label会被自动隐藏。',
  },
  width: 600,
  height: 600,
  padding: 'auto',
  data,
  xField: 'value',
  yField: 'year',
  yAxis: {
    min: 0,
  },
  stackField: 'type',
  label: {
    visible: true,
    position: 'middle',
  },
});
barPlot.render();

// 作为模块 避免变量冲突
export {}
