import { Chart } from '@antv/g2';

/**
 * 多系列双向条形图
 * 场景：对比不同年份的正负业绩，通过 color 通道区分年份
 */
const data = [
  { category: '东区', year: '2023', value: 120 },
  { category: '西区', year: '2023', value: -80 },
  { category: '北区', year: '2023', value: 150 },
  { category: '南区', year: '2023', value: -50 },
  { category: '中区', year: '2023', value: 90 },
  { category: '东区', year: '2024', value: 130 },
  { category: '西区', year: '2024', value: -60 },
  { category: '北区', year: '2024', value: 170 },
  { category: '南区', year: '2024', value: -70 },
  { category: '中区', year: '2024', value: 110 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'value', y: 'category', color: 'year' },
  scale: { x: { nice: false } },
  coordinate: { transform: [{ type: 'transpose' }] },
  transform: [{ type: 'dodgeX' }],
});

chart.render();