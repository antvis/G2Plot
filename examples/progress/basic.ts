import { Chart } from '@antv/g2';

/**
 * 基础进度条
 * 场景：单一指标相对目标的完成度（如季度目标完成率），需要一眼看出已完成与剩余部分
 * 要点：interval + transpose 横向排布；view 叠加灰色轨道与彩色进度；scale.y 固定 [0, target] 保证长度可比
 */
const data = [
  { metric: '季度目标完成率', completed: 72, target: 100 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: { y: { domain: [0, 100] } },
  axis: { x: false, y: false },
  legend: false,
  children: [
    {
      type: 'interval',
      encode: { x: 'metric', y: 'target', size: 28 },
      style: { fill: '#EEF2F7', radius: 14 },
      tooltip: false,
    },
    {
      type: 'interval',
      encode: { x: 'metric', y: 'completed', size: 28 },
      style: { fill: '#5B8FF9', radius: 14 },
      labels: [
        {
          text: (d: { completed: number }) => `${d.completed}%`,
          position: 'right',
          style: { fontSize: 14, fontWeight: 600, fill: '#1d1d1d' },
        },
      ],
    },
  ],
});

chart.render();
