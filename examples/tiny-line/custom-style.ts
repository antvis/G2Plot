/**
 * 自定义样式迷你折线图
 * 场景：品牌看板中的营收预测趋势，用品牌色和虚线区分预测数据
 * 要点：style.stroke 固定颜色，lineWidth 控制线宽，lineDash 设置虚线
 */
import { Chart } from '@antv/g2';

const data = [
  { date: '2026-11-01', forecastRevenue: 32 },
  { date: '2026-11-02', forecastRevenue: 35 },
  { date: '2026-11-03', forecastRevenue: 34 },
  { date: '2026-11-04', forecastRevenue: 41 },
  { date: '2026-11-05', forecastRevenue: 46 },
  { date: '2026-11-06', forecastRevenue: 44 },
  { date: '2026-11-07', forecastRevenue: 52 },
  { date: '2026-11-08', forecastRevenue: 58 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data,
  encode: { x: 'date', y: 'forecastRevenue' },
  axis: { x: false, y: false },
  legend: false,
  tooltip: false,
  style: { stroke: '#FF6B35', lineWidth: 3, lineDash: [6, 4] },
});

chart.render();
