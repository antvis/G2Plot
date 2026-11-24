import { Chart } from '@antv/g2';

/**
 * 圆角玉珏图
 * 用途：通过圆角与更大的中心孔提升环带的可读性，适合大屏与看板
 * 场景：运营大屏的核心指标分布、SaaS 后台的资源占用概览
 * 关键要点：polar 的 innerRadius 取较大值（0.45）留出中心区域；style.radius 设置柱形圆角；关闭 x 轴网格线，避免网格穿过环带
 */
const data = [
  { resource: '计算', usage: 72 },
  { resource: '存储', usage: 58 },
  { resource: '网络', usage: 41 },
  { resource: '数据库', usage: 83 },
  { resource: '缓存', usage: 36 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'resource', y: 'usage', color: 'resource' },
  coordinate: { type: 'polar', innerRadius: 0.45 },
  style: { radius: 6 },
  axis: { x: { grid: false } },
  legend: false,
});

chart.render();