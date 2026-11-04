import { Chart } from '@antv/g2';

/**
 * 按绝对值排序的双向条形图
 * 场景：展示各项的影响力大小，绝对值最大的在中心位置，正负分布可视化
 */
const data = [
  { category: '产品A', value: 45 },
  { category: '产品B', value: -120 },
  { category: '产品C', value: 80 },
  { category: '产品D', value: -60 },
  { category: '产品E', value: 30 },
];

// 按绝对值从大到小排序
const sortedData = [...data].sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: sortedData,
  encode: { x: 'value', y: 'category' },
  scale: { x: { nice: false } },
  coordinate: { transform: [{ type: 'transpose' }] },
});

chart.render();