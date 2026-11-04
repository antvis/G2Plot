/**
 * 基础迷你柱状图
 * 场景：KPI 卡片等紧凑区域展示近 12 天访问量的相对高低与波动
 * 要点：interval + 隐藏 x/y 轴和图例；保留 tooltip 供按需读数
 */
import { Chart } from '@antv/g2';

const data = [
  { date: '2026-01-01', pageViews: 320 },
  { date: '2026-01-02', pageViews: 460 },
  { date: '2026-01-03', pageViews: 380 },
  { date: '2026-01-04', pageViews: 520 },
  { date: '2026-01-05', pageViews: 610 },
  { date: '2026-01-06', pageViews: 480 },
  { date: '2026-01-07', pageViews: 560 },
  { date: '2026-01-08', pageViews: 720 },
  { date: '2026-01-09', pageViews: 650 },
  { date: '2026-01-10', pageViews: 780 },
  { date: '2026-01-11', pageViews: 690 },
  { date: '2026-01-12', pageViews: 840 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'date', y: 'pageViews' },
  axis: { x: false, y: false },
  legend: false,
  style: { maxWidth: 12 },
});

chart.render();
