import { Chart } from '@antv/g2';

/**
 * 分组柱状图
 * 场景：多系列在每个类别下并排对比绝对值（各季度多条产品线营收）
 * 要点：多系列 interval 必须加 dodgeX，否则柱体重叠在同一位置
 */
const data = [
  { quarter: 'Q1', product: '手机', revenue: 320 },
  { quarter: 'Q2', product: '手机', revenue: 420 },
  { quarter: 'Q3', product: '手机', revenue: 380 },
  { quarter: 'Q4', product: '手机', revenue: 520 },
  { quarter: 'Q1', product: '平板', revenue: 220 },
  { quarter: 'Q2', product: '平板', revenue: 280 },
  { quarter: 'Q3', product: '平板', revenue: 250 },
  { quarter: 'Q4', product: '平板', revenue: 300 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'quarter', y: 'revenue', color: 'product' },
  transform: [{ type: 'dodgeX' }],
});

chart.render();
