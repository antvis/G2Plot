import { Chart } from '@antv/g2';

/**
 * 分组堆叠直方图
 * 场景：对比不同渠道的订单金额分布（线上商城 vs 线下门店）
 * 要点：encode.color 分组 + binX 分箱 + stackY 堆叠，同一金额区间内按渠道累加
 */
const onlineOrders = [
  58, 64, 70, 75, 80, 84, 88, 92, 96, 100,
  104, 108, 112, 116, 120, 125, 130, 135, 140, 146,
  152, 158, 165, 172, 180, 190, 200, 212, 225, 240,
];

const storeOrders = [
  88, 96, 104, 112, 120, 128, 136, 144, 152, 160,
  168, 176, 184, 192, 200, 208, 216, 224, 232, 240,
  248, 256, 264, 272, 280, 290, 300, 312, 325, 340,
];

const data = [
  ...onlineOrders.map((amount, index) => ({
    orderNo: `ON-${String(index + 1).padStart(4, '0')}`,
    amount,
    channel: '线上商城',
  })),
  ...storeOrders.map((amount, index) => ({
    orderNo: `ST-${String(index + 1).padStart(4, '0')}`,
    amount,
    channel: '线下门店',
  })),
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'rect',
  data,
  encode: { x: 'amount', y: 'count', color: 'channel' },
  transform: [
    { type: 'binX', y: 'count', thresholds: 10 },
    { type: 'stackY' },
  ],
  scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } },
  style: { inset: 0.5 },
  axis: {
    x: { title: '订单金额（元）' },
    y: { title: '订单笔数' },
  },
  legend: { color: { position: 'top' } },
});

chart.render();