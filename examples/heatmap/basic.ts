import { Chart } from '@antv/g2';

/**
 * 基础矩阵热力图
 * 场景：两个类别维度交叉的数值密度（如 星期 × 时段 的访问量分布）
 * 要点：cell mark + sequential 顺序色阶；inset 控制格子间距
 */
const data = [
  { week: 'Mon', hour: '上午', pv: 10 },
  { week: 'Mon', hour: '中午', pv: 80 },
  { week: 'Mon', hour: '晚上', pv: 60 },
  { week: 'Tue', hour: '上午', pv: 15 },
  { week: 'Tue', hour: '中午', pv: 95 },
  { week: 'Tue', hour: '晚上', pv: 70 },
  { week: 'Wed', hour: '上午', pv: 20 },
  { week: 'Wed', hour: '中午', pv: 75 },
  { week: 'Wed', hour: '晚上', pv: 55 },
  { week: 'Thu', hour: '上午', pv: 18 },
  { week: 'Thu', hour: '中午', pv: 88 },
  { week: 'Thu', hour: '晚上', pv: 92 },
  { week: 'Fri', hour: '上午', pv: 25 },
  { week: 'Fri', hour: '中午', pv: 90 },
  { week: 'Fri', hour: '晚上', pv: 120 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'cell',
  data,
  encode: { x: 'week', y: 'hour', color: 'pv' },
  scale: { color: { type: 'sequential', palette: 'YlOrRd' } },
  style: { inset: 1 },
});

chart.render();
