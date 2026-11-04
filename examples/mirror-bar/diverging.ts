import { Chart } from '@antv/g2';

/**
 * 正负值发散条形图
 * 场景：单个指标本身带正负含义（如产品利润、账户盈亏），按符号直接左右镜像
 * 要点：数据保留带符号数值，encode.y 直接映射；color 回调按符号分组，避免新增冗余字段
 */
const data = [
  { product: '手机', profit: 320 },
  { product: '笔记本', profit: 180 },
  { product: '平板', profit: -60 },
  { product: '智能穿戴', profit: 95 },
  { product: '配件', profit: -35 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'product',
    y: 'profit',
    // 按正负号着色：盈利在右、亏损在左
    color: (d: { profit: number }) => (d.profit >= 0 ? '盈利' : '亏损'),
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: {
    color: { domain: ['盈利', '亏损'], range: ['#5AD8A6', '#E8684A'] },
  },
  axis: {
    x: { title: '产品线' },
    y: {
      title: '利润（万元）',
      labelFormatter: (d: number) => String(Math.abs(d)),
    },
  },
  legend: { color: { position: 'top' } },
});

chart.render();
