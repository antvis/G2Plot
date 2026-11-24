import { Chart } from '@antv/g2';

/**
 * 暗色主题玉珏图
 * 用途：在深色画布上展示玉珏图，并让坐标轴、图例、标题文字自动适配暗色
 * 场景：监控大屏、夜间模式后台
 * 关键要点：暗色主题需要同时设置两处——theme 走 'classicDark' 让文字与网格适配，view 层 style.viewFill 提供深色画布背景；只设 theme 时图表仍画在白底上
 */
const data = [
  { service: '网关', qps: 8600 },
  { service: '订单', qps: 6400 },
  { service: '库存', qps: 4200 },
  { service: '用户', qps: 3800 },
  { service: '支付', qps: 2600 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  theme: 'classicDark',
  style: { viewFill: '#0f172a' },
  children: [
    {
      type: 'interval',
      data,
      encode: { x: 'service', y: 'qps', color: 'service' },
      coordinate: { type: 'polar', innerRadius: 0.4 },
      style: { radius: 4 },
      axis: { x: { grid: false } },
      legend: false,
    },
  ],
});

chart.render();