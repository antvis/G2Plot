/**
 * 堆叠柱 + 总量折线：子 mark 独立数据
 * 场景：各渠道营收构成（堆叠柱）与总营收趋势（折线）同图对比
 * 要点：interval 用 transform stackY 堆叠；折线 mark 直接挂独立 data，
 *       不要在 children 里再套一层 view
 */
import { Chart } from '@antv/g2';

const revenueByChannel = [
  { month: 'Jan', channel: '线上', revenue: 220 },
  { month: 'Feb', channel: '线上', revenue: 280 },
  { month: 'Mar', channel: '线上', revenue: 250 },
  { month: 'Apr', channel: '线上', revenue: 320 },
  { month: 'May', channel: '线上', revenue: 360 },
  { month: 'Jan', channel: '线下', revenue: 120 },
  { month: 'Feb', channel: '线下', revenue: 150 },
  { month: 'Mar', channel: '线下', revenue: 180 },
  { month: 'Apr', channel: '线下', revenue: 140 },
  { month: 'May', channel: '线下', revenue: 160 },
];

// 总量独立维护：折线不等于任一通道，需单独聚合
const monthlyTotal = [
  { month: 'Jan', total: 340 },
  { month: 'Feb', total: 430 },
  { month: 'Mar', total: 430 },
  { month: 'Apr', total: 460 },
  { month: 'May', total: 520 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'interval',
      data: revenueByChannel,
      encode: { x: 'month', y: 'revenue', color: 'channel' },
      transform: [{ type: 'stackY' }],
      style: { radiusTopLeft: 4, radiusTopRight: 4 },
    },
    {
      type: 'line',
      data: monthlyTotal,
      encode: { x: 'month', y: 'total', shape: 'smooth' },
      style: { stroke: '#1d1d1d', lineWidth: 2 },
    },
  ],
  scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } },
  axis: { x: { title: '月份' }, y: { title: '营收（万元）' } },
  legend: { color: { position: 'top' } },
});

chart.render();
