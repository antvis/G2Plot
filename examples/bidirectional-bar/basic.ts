/**
 * 工单白班与晚班对比：两组按相同工单类别对齐
 * 负号只用于将白班绘制到左侧；刻度与提示显示原始非负工单数
 * 共用以零为中心的对称数轴，避免相同数量被画成不同长度
 */
import { Chart } from '@antv/g2';

const tickets = [
  { category: 'Account', day: 42, evening: 31 },
  { category: 'Billing', day: 28, evening: 37 },
  { category: 'Setup', day: 36, evening: 36 },
  { category: 'Delivery', day: 19, evening: 46 },
  { category: 'Other', day: 13, evening: 9 },
];

const data = tickets.flatMap(({ category, day, evening }) => [
  { category, shift: 'Day shift', count: day, signedCount: -day },
  { category, shift: 'Evening shift', count: evening, signedCount: evening },
]);
const limit = Math.max(10, Math.ceil(Math.max(...data.map((d) => d.count)) / 10) * 10);

const chart = new Chart({ container: 'container', autoFit: true });

chart.options({
  type: 'interval',
  coordinate: { transform: [{ type: 'transpose' }] },
  data,
  encode: { x: 'category', y: 'signedCount', color: 'shift' },
  scale: {
    x: { domain: tickets.map((d) => d.category), padding: 0.3 },
    y: { type: 'linear', domain: [-limit, limit], nice: false, tickCount: 5 },
    color: { domain: ['Day shift', 'Evening shift'], range: ['#2563EB', '#B45309'] },
  },
  axis: {
    x: { title: false },
    y: { title: 'Tickets (count)', labelFormatter: (value: number | string) => String(Math.abs(Number(value))) },
  },
  tooltip: { title: 'category', items: [{ field: 'count', name: 'Tickets' }, { field: 'shift', name: 'Shift' }] },
});

chart.render();
