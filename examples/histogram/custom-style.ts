import { Chart } from '@antv/g2';

/**
 * 自定义样式直方图
 * 场景：品牌化看板中的订单金额分布，需要更细的分箱与标题、提示文案
 * 要点：thresholds 控制分箱粒度，style 定制柱形，title / tooltip 补齐图表语义
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
  transform: [{ type: 'binX', y: 'count', thresholds: 12 }],
  style: { fill: '#FF6B35', fillOpacity: 0.85, inset: 1 },
  title: {
    title: '订单金额分布',
    subtitle: '样本：近 90 天 40 笔订单',
    align: 'left',
  },
  axis: {
    x: { title: '订单金额（元）' },
    y: { title: '订单笔数' },
  },
  tooltip: {
    items: [{ channel: 'y', name: '订单数', valueFormatter: (value) => `${value} 笔` }],
  },
});

chart.render();