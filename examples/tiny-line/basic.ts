/**
 * 基础迷你折线图
 * 场景：在指标卡或表格行内展示单个指标的短期趋势，如每日新增订阅数
 * 要点：使用 line mark，关闭坐标轴、图例和 tooltip，只保留趋势线
 */
import { Chart } from '@antv/g2';

const data = [
  { date: '2026-10-01', newSubscribers: 120 },
  { date: '2026-10-02', newSubscribers: 132 },
  { date: '2026-10-03', newSubscribers: 101 },
  { date: '2026-10-04', newSubscribers: 164 },
  { date: '2026-10-05', newSubscribers: 182 },
  { date: '2026-10-06', newSubscribers: 156 },
  { date: '2026-10-07', newSubscribers: 210 },
  { date: '2026-10-08', newSubscribers: 236 },
  { date: '2026-10-09', newSubscribers: 218 },
  { date: '2026-10-10', newSubscribers: 264 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data,
  encode: { x: 'date', y: 'newSubscribers' },
  axis: { x: false, y: false },
  legend: false,
  tooltip: false,
  style: { stroke: '#5B8FF9', lineWidth: 2 },
});

chart.render();
