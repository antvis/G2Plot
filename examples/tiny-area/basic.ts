/**
 * 基础迷你面积图
 * 场景：在指标卡或表格行内展示单个指标的短期趋势与量级，如每日活跃用户数
 * 要点：使用 area mark，关闭坐标轴、图例和 tooltip，用半透明填充保留趋势形状
 */
import { Chart } from '@antv/g2';

const data = [
  { date: '2026-10-01', dailyActiveUsers: 820 },
  { date: '2026-10-02', dailyActiveUsers: 932 },
  { date: '2026-10-03', dailyActiveUsers: 901 },
  { date: '2026-10-04', dailyActiveUsers: 1290 },
  { date: '2026-10-05', dailyActiveUsers: 1330 },
  { date: '2026-10-06', dailyActiveUsers: 1120 },
  { date: '2026-10-07', dailyActiveUsers: 980 },
  { date: '2026-10-08', dailyActiveUsers: 1210 },
  { date: '2026-10-09', dailyActiveUsers: 1405 },
  { date: '2026-10-10', dailyActiveUsers: 1520 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'area',
  data,
  encode: { x: 'date', y: 'dailyActiveUsers' },
  axis: { x: false, y: false },
  legend: false,
  tooltip: false,
  style: { fill: '#5B8FF9', fillOpacity: 0.6 },
});

chart.render();
