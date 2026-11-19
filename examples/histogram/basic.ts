import { Chart } from '@antv/g2';

/**
 * 基础直方图
 * 场景：单个连续数值字段的频次分布（如近 90 天订单金额分布）
 * 要点：rect mark + binX transform 自动分箱并统计频次，无需预先聚合
 */
const orderAmounts = [
  68, 72, 78, 82, 85, 88, 92, 95, 98, 102,
  105, 108, 112, 115, 118, 122, 125, 128, 132, 135,
  138, 142, 145, 148, 152, 155, 158, 162, 168, 175,
  182, 190, 198, 208, 220, 235, 252, 275, 305, 350,
];

const data = orderAmounts.map((amount, index) => ({
  orderNo: `SO-${String(index + 1).padStart(4, '0')}`,
  amount,
}));

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'rect',
  data,
  encode: { x: 'amount', y: 'count' },
  transform: [{ type: 'binX', y: 'count', thresholds: 8 }],
  style: { fill: '#5B8FF9', fillOpacity: 0.9, inset: 0.5 },
  axis: {
    x: { title: '订单金额（元）' },
    y: { title: '订单笔数' },
  },
});

chart.render();