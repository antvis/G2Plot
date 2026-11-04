/**
 * 迷你面积图（基础）
 * 场景：表格行内或 KPI 卡片中展示近 7 天订单量走势，只关心形状不关心刻度
 * 要点：标准 area mark + axis: false + legend: false；容器高度决定图表高度
 */
import { Chart } from '@antv/g2';

const data = [
  { date: '09-28', orders: 320 },
  { date: '09-29', orders: 286 },
  { date: '09-30', orders: 412 },
  { date: '10-01', orders: 508 },
  { date: '10-02', orders: 465 },
  { date: '10-03', orders: 530 },
  { date: '10-04', orders: 488 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'area',
  data,
  encode: { x: 'date', y: 'orders' },
  // 迷你图不显示坐标轴与图例，把空间全部留给趋势形状
  axis: false,
  legend: false,
  style: { fill: '#5B8FF9', fillOpacity: 0.3 },
});

chart.render();
