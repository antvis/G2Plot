import { Chart } from '@antv/g2';

/**
 * 带绝对值标签的收支对称条形图
 * 场景：每月收入与支出左右对比，同时直接在条形末端读出金额
 * 要点：labels text 回调取 Math.abs，避免负数条形显示带负号的金额
 */
const data = [
  { month: '1 月', type: '收入', amount: 128 },
  { month: '2 月', type: '收入', amount: 146 },
  { month: '3 月', type: '收入', amount: 132 },
  { month: '4 月', type: '收入', amount: 168 },
  { month: '1 月', type: '支出', amount: 96 },
  { month: '2 月', type: '支出', amount: 108 },
  { month: '3 月', type: '支出', amount: 88 },
  { month: '4 月', type: '支出', amount: 124 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'month',
    y: (d: { type: string; amount: number }) =>
      d.type === '支出' ? -d.amount : d.amount,
    color: 'type',
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: { color: { range: ['#5B8FF9', '#FF7875'] } },
  labels: [
    {
      // 条形末端显示绝对值，支出不显示负号
      text: (d: { amount: number }) => String(Math.abs(d.amount)),
      position: 'outside',
      style: { fontSize: 10, fill: '#595959' },
    },
  ],
  axis: {
    x: { title: '月份' },
    y: {
      title: '金额（万元）',
      labelFormatter: (d: number) => String(Math.abs(d)),
    },
  },
  legend: { color: { position: 'top' } },
});

chart.render();
