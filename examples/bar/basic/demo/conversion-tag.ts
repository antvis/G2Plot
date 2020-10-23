import { Bar } from '@antv/g2plot';

const data = [
  { action: '完成交易', pv: 8500 },
  { action: '支付订单', pv: 15000 },
  { action: '生成订单', pv: 25000 },
  { action: '放入购物车', pv: 35000 },
  { action: '浏览网站', pv: 50000 },
];

const barPlot = new Bar('container', {
  data,
  xField: 'pv',
  yField: 'action',
  barWidthRatio: 1 / 3,
  conversionTag: {},
});

barPlot.render();
