import { Chart } from '@antv/g2';

/**
 * 基础进度条
 * 场景：单个指标的完成度（如季度目标达成率），一条轨道 + 一段进度
 * 要点：轨道与进度是同一个 view 下叠放的两个 interval，靠 scale.y.domain 固定 0~100%；
 *       单类别不限制条厚会撑满画布高度，用 style.maxWidth 控制
 */
const data = [{ metric: '季度目标达成率', completionRate: 0.72 }];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      // 轨道：恒为满值，作为进度条的底
      type: 'interval',
      encode: { x: 'metric', y: () => 1 },
      style: { fill: '#F0F2F5', radius: 12, maxWidth: 24 },
      tooltip: false,
    },
    {
      // 进度：实际完成度
      type: 'interval',
      encode: { x: 'metric', y: 'completionRate' },
      style: { fill: '#5B8FF9', radius: 12, maxWidth: 24 },
    },
  ],
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: { y: { domain: [0, 1] } },
  axis: false,
  legend: false,
  tooltip: {
    items: [{ channel: 'y', name: '完成率', valueFormatter: (v) => `${Math.round(Number(v) * 100)}%` }],
  },
});

chart.render();
