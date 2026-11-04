/**
 * 正负值迷你柱状图
 * 场景：在紧凑的财务卡片中展示每日净利润的盈亏方向与相对幅度
 * 要点：保留 y 值正负号；encode.color 按数值分类，scale.color 固定盈亏颜色
 */
import { Chart } from '@antv/g2';

const data = [
  { tradingDay: '2026-03-02', netProfit: 12.4 },
  { tradingDay: '2026-03-03', netProfit: -5.2 },
  { tradingDay: '2026-03-04', netProfit: 8.6 },
  { tradingDay: '2026-03-05', netProfit: 15.1 },
  { tradingDay: '2026-03-06', netProfit: -9.8 },
  { tradingDay: '2026-03-09', netProfit: 6.3 },
  { tradingDay: '2026-03-10', netProfit: 18.7 },
  { tradingDay: '2026-03-11', netProfit: -3.5 },
  { tradingDay: '2026-03-12', netProfit: 10.9 },
  { tradingDay: '2026-03-13', netProfit: -12.1 },
  { tradingDay: '2026-03-16', netProfit: 20.4 },
  { tradingDay: '2026-03-17', netProfit: 14.8 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'tradingDay',
    y: 'netProfit',
    color: (d: { netProfit: number }) => (d.netProfit >= 0 ? '盈利' : '亏损'),
  },
  scale: {
    color: { domain: ['盈利', '亏损'], range: ['#5B8FF9', '#F4664A'] },
  },
  axis: { x: false, y: false },
  legend: false,
  style: { maxWidth: 12 },
  tooltip: {
    title: 'tradingDay',
    items: [{ channel: 'y', name: '净利润', valueFormatter: (v) => `${v} 万元` }],
  },
});

chart.render();
