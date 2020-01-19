// 漏斗图

const data = [
  { action: '浏览网站', pv: 50000 },
  { action: '放入购物车', pv: 35000 },
  { action: '生成订单', pv: 25000 },
  { action: '支付订单', pv: 15000 },
  { action: '完成交易', pv: 8500 },
];

const funnelPlot = new g2plot.Funnel(document.getElementById('canvas'), {
  width: 500,
  height: 500,
  data,
  xField: 'action',
  yField: 'pv',
  dynamicHeight: true,
  transpose: true,
});
funnelPlot.render();

// 作为模块 避免变量冲突
export {};
