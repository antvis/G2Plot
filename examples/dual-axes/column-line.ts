import { Chart } from '@antv/g2';

/**
 * 柱线双轴图
 * 场景：量级不同的两个指标同图对比（销售额 万元 与 增长率 %）
 * 要点：view + children；第二个系列 scale.y.independent: true 启用右轴
 */
const data = [
  { month: 'Jan', sales: 320, growth: 0.12 },
  { month: 'Feb', sales: 420, growth: 0.31 },
  { month: 'Mar', sales: 380, growth: -0.10 },
  { month: 'Apr', sales: 520, growth: 0.37 },
  { month: 'May', sales: 480, growth: -0.08 },
  { month: 'Jun', sales: 610, growth: 0.27 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'interval',
      encode: { x: 'month', y: 'sales' },
      axis: { y: { title: '销售额（万元）' } },
    },
    {
      type: 'line',
      encode: { x: 'month', y: 'growth', shape: 'smooth' },
      scale: { y: { independent: true } },
      style: { stroke: '#F6BD16', lineWidth: 2 },
      axis: {
        y: {
          title: '增长率',
          labelFormatter: (v: number) => `${(v * 100).toFixed(0)}%`,
        },
      },
    },
  ],
});

chart.render();
