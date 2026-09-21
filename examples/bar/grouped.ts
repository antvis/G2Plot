import { Chart } from '@antv/g2';

/**
 * 分组条形图
 * 场景：长类别名下的多系列横向对比（各事业部今年/去年目标达成）
 * 要点：transpose + dodgeX 组合；多系列必须加 dodgeX 避免重叠
 */
const data = [
  { dept: '产品研发部', year: '2025', value: 95 },
  { dept: '市场营销部', year: '2025', value: 78 },
  { dept: '客户服务部', year: '2025', value: 88 },
  { dept: '产品研发部', year: '2026', value: 110 },
  { dept: '市场营销部', year: '2026', value: 92 },
  { dept: '客户服务部', year: '2026', value: 96 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'dept', y: 'value', color: 'year' },
  transform: [{ type: 'dodgeX' }],
  coordinate: { transform: [{ type: 'transpose' }] },
});

chart.render();
