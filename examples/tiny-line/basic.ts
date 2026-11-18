/**
 * 基础迷你折线图
 * 场景：在 KPI 卡片中展示近 7 天访问量的单系列趋势
 * 要点：type: 'line' + encode { x, y }；关闭坐标轴、图例和 tooltip 保持紧凑
 */
import { Chart } from '@antv/g2';

const data = [
  { day: '11-10', visits: 120 },
  { day: '11-11', visits: 168 },
  { day: '11-12', visits: 145 },
  { day: '11-13', visits: 210 },
  { day: '11-14', visits: 186 },
  { day: '11-15', visits: 245 },
  { day: '11-16', visits: 228 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data,
  encode: { x: 'day', y: 'visits' },
  style: { stroke: '#5B8FF9', lineWidth: 2 },
  axis: false,
  legend: false,
  tooltip: false,
});

chart.render();
