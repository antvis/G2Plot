import { Chart } from '@antv/g2';

/**
 * 多指标进度列表
 * 场景：一屏对比多个团队 / 多个系统的完成率，每行一条独立的 0~100% 进度
 * 要点：轨道层与进度层共用同一个 x 类别，横向转置后 x 轴变成左侧指标名；
 *       类别多时用 maxWidth 压薄条形，避免条与条挤在一起
 */
const data = [
  { team: '华东', completionRate: 0.92 },
  { team: '华南', completionRate: 0.78 },
  { team: '华北', completionRate: 0.65 },
  { team: '西南', completionRate: 0.48 },
  { team: '东北', completionRate: 0.31 },
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
      // 轨道：每个指标一条满值底条
      type: 'interval',
      encode: { x: 'team', y: () => 1 },
      style: { fill: '#F0F2F5', radius: 6, maxWidth: 16 },
      tooltip: false,
    },
    {
      type: 'interval',
      encode: { x: 'team', y: 'completionRate' },
      style: { fill: '#5B8FF9', radius: 6, maxWidth: 16 },
    },
  ],
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: { y: { domain: [0, 1] } },
  axis: {
    x: { title: false, labelFontSize: 12, labelFill: '#4E5969' },
    y: false,
  },
  legend: false,
  tooltip: {
    items: [{ channel: 'y', name: '完成率', valueFormatter: (v) => `${Math.round(Number(v) * 100)}%` }],
  },
});

chart.render();
