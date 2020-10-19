import { Funnel } from '@antv/g2plot';

const data = [
  { action: '浏览网站', pv: 50000, quarter: '2020Q1' },
  { action: '放入购物车', pv: 35000, quarter: '2020Q1' },
  { action: '生成订单', pv: 25000, quarter: '2020Q1' },
  { action: '支付订单', pv: 15000, quarter: '2020Q1' },
  { action: '完成交易', pv: 11500, quarter: '2020Q1' },
  { action: '浏览网站', pv: 80000, quarter: '2020Q2' },
  { action: '放入购物车', pv: 63000, quarter: '2020Q2' },
  { action: '生成订单', pv: 47000, quarter: '2020Q2' },
  { action: '支付订单', pv: 24000, quarter: '2020Q2' },
  { action: '完成交易', pv: 17500, quarter: '2020Q2' },
];

const funnelPlot = new Funnel('container', {
  data,
  xField: 'action',
  yField: 'pv',
  compareField: 'quarter',
  meta: {
    action: {
      alias: '用户行为',
    },
    pv: {
      alias: '访问量',
      formatter: (v) => `${v}次`,
    },
  },
  conversionTag: {
    offsetX: 10,
    offsetY: 0,
    style: {
      fill: '#666',
      fontSize: 12,
    },
    formatter: (data) => `转化${data.$$percentage$$.toFixed(2)}`,
  },
});
funnelPlot.render();
