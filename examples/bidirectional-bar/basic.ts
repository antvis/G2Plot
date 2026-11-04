import { Chart } from '@antv/g2';

/**
 * 基础双向条形图
 * 场景：展示各地区的正负业绩对比，正值向右延伸，负值向左延伸
 */
const data = [
  { category: '东区', value: 120 },
  { category: '西区', value: -80 },
  { category: '北区', value: 150 },
  { category: '南区', value: -50 },
  { category: '中区', value: 90 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'value', y: 'category' },
  scale: { x: { nice: false } },
  coordinate: { transform: [{ type: 'transpose' }] },
});

chart.render();