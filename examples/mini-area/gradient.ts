/**
 * 迷你面积图（渐变填充 + 平滑曲线）
 * 场景：KPI 卡片中的品牌色趋势缩略图，弱化底部、突出曲线走向
 * 要点：style.fill 写 180deg 垂直渐变；encode.shape: 'smooth'；tooltip 格式化金额单位
 */
import { Chart } from '@antv/g2';

const data = [
  { week: 'W1', revenue: 82000 },
  { week: 'W2', revenue: 94000 },
  { week: 'W3', revenue: 88000 },
  { week: 'W4', revenue: 106000 },
  { week: 'W5', revenue: 99000 },
  { week: 'W6', revenue: 124000 },
  { week: 'W7', revenue: 118000 },
  { week: 'W8', revenue: 136000 },
  { week: 'W9', revenue: 129000 },
  { week: 'W10', revenue: 152000 },
  { week: 'W11', revenue: 144000 },
  { week: 'W12', revenue: 168000 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'area',
  data,
  encode: { x: 'week', y: 'revenue', shape: 'smooth' },
  axis: false,
  legend: false,
  style: {
    // 垂直渐变用 180deg：顶部品牌色 → 底部近乎透明
    fill: 'linear-gradient(180deg, #FF6B35 0%, rgba(255,107,53,0.08) 100%)',
  },
  tooltip: {
    title: 'week',
    items: [
      {
        channel: 'y',
        name: '营收',
        valueFormatter: (value) => `${(Number(value) / 10000).toFixed(1)} 万元`,
      },
    ],
  },
});

chart.render();
