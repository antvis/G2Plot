/**
 * 自定义样式迷你面积图
 * 场景：品牌看板中的营收趋势，用品牌色垂直渐变增强量感
 * 要点：style.fill 写 180deg 垂直渐变，fillOpacity 保持渐变层次
 */
import { Chart } from '@antv/g2';

const data = [
  { date: '2026-11-01', revenue: 32 },
  { date: '2026-11-02', revenue: 35 },
  { date: '2026-11-03', revenue: 34 },
  { date: '2026-11-04', revenue: 41 },
  { date: '2026-11-05', revenue: 46 },
  { date: '2026-11-06', revenue: 44 },
  { date: '2026-11-07', revenue: 52 },
  { date: '2026-11-08', revenue: 58 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'area',
  data,
  encode: { x: 'date', y: 'revenue' },
  axis: { x: false, y: false },
  legend: false,
  tooltip: false,
  style: {
    // 180deg = 从上到下：顶部实色，底部渐隐
    fill: 'linear-gradient(180deg, #FF6B35 0%, rgba(255,107,53,0.05) 100%)',
    fillOpacity: 0.9,
  },
});

chart.render();
