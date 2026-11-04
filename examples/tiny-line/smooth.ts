/**
 * 平滑迷你折线图
 * 场景：天气卡片等紧凑区域展示连续变化的整体走向，弱化单点折角
 * 要点：encode.shape 设为 'smooth'，并延续无坐标轴、无图例的精简布局
 */
import { Chart } from '@antv/g2';

const data = [
  { hour: '00:00', temperature: 18 },
  { hour: '03:00', temperature: 16 },
  { hour: '06:00', temperature: 17 },
  { hour: '09:00', temperature: 22 },
  { hour: '12:00', temperature: 27 },
  { hour: '15:00', temperature: 29 },
  { hour: '18:00', temperature: 25 },
  { hour: '21:00', temperature: 21 },
  { hour: '24:00', temperature: 19 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data,
  encode: { x: 'hour', y: 'temperature', shape: 'smooth' },
  axis: { x: false, y: false },
  legend: false,
  tooltip: false,
  style: { stroke: '#5AD8A6', lineWidth: 2 },
});

chart.render();
