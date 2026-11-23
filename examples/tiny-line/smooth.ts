/**
 * 平滑迷你折线图
 * 场景：在监控卡片中弱化单小时抖动，观察响应耗时的整体变化
 * 要点：通过 encode.shape: 'smooth' 平滑曲线，不使用旧版链式 shape API
 */
import { Chart } from '@antv/g2';

const data = [
  { hour: '08:00', latency: 42 },
  { hour: '09:00', latency: 58 },
  { hour: '10:00', latency: 47 },
  { hour: '11:00', latency: 65 },
  { hour: '12:00', latency: 52 },
  { hour: '13:00', latency: 70 },
  { hour: '14:00', latency: 61 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data,
  encode: { x: 'hour', y: 'latency', shape: 'smooth' },
  style: { stroke: '#5AD8A6', lineWidth: 2 },
  axis: false,
  legend: false,
  tooltip: false,
});

chart.render();
