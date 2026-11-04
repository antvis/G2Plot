import { Chart } from '@antv/g2';

/**
 * 基础抖动图
 * 场景：比较不同设备类型的页面加载耗时分布，避免同类观测点重叠
 * 要点：point mark + jitterX；只抖动分类轴方向，保持 y 数值精确
 */
const data = [
  { deviceType: '桌面端', loadTimeMs: 820 },
  { deviceType: '桌面端', loadTimeMs: 760 },
  { deviceType: '桌面端', loadTimeMs: 910 },
  { deviceType: '桌面端', loadTimeMs: 840 },
  { deviceType: '桌面端', loadTimeMs: 780 },
  { deviceType: '桌面端', loadTimeMs: 1020 },
  { deviceType: '桌面端', loadTimeMs: 860 },
  { deviceType: '桌面端', loadTimeMs: 790 },
  { deviceType: '移动端', loadTimeMs: 1180 },
  { deviceType: '移动端', loadTimeMs: 1320 },
  { deviceType: '移动端', loadTimeMs: 1250 },
  { deviceType: '移动端', loadTimeMs: 1480 },
  { deviceType: '移动端', loadTimeMs: 1210 },
  { deviceType: '移动端', loadTimeMs: 1360 },
  { deviceType: '移动端', loadTimeMs: 1290 },
  { deviceType: '移动端', loadTimeMs: 1580 },
  { deviceType: '平板端', loadTimeMs: 960 },
  { deviceType: '平板端', loadTimeMs: 1040 },
  { deviceType: '平板端', loadTimeMs: 990 },
  { deviceType: '平板端', loadTimeMs: 1120 },
  { deviceType: '平板端', loadTimeMs: 1010 },
  { deviceType: '平板端', loadTimeMs: 1080 },
  { deviceType: '平板端', loadTimeMs: 970 },
  { deviceType: '平板端', loadTimeMs: 1150 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'point',
  data,
  encode: { x: 'deviceType', y: 'loadTimeMs', size: 4 },
  transform: [{ type: 'jitterX', padding: 0.1 }],
  style: { fillOpacity: 0.7 },
  axis: { y: { title: '页面加载耗时（ms）' } },
});

chart.render();
