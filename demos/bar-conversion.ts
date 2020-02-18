// 条形图转化率组件

const data = [
  { action: '浏览网站', pv: 50000 },
  { action: '放入购物车', pv: 35000 },
  { action: '生成订单', pv: 25000 },
  { action: '支付订单', pv: 15000 },
  { action: '完成交易', pv: 8500 },
];

const barPlot = new g2plot.Bar(document.getElementById('canvas'), {
  width: 600,
  height: 600,
  padding: 'auto',
  data,
  xField: 'pv',
  yField: 'action',
  conversionTag: {
    visible: true,
  },
});
barPlot.render();

// 作为模块 避免变量冲突
export {};
