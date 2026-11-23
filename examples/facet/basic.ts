/**
 * 按三个区域分面比较每周工单数量
 * 每个面板只显示本区域，子图共用周序和零起点数量轴
 * 合成数据：各区域 W2 都是 24 单，正确同步的面板中等量柱应等高
 */
import { Chart } from '@antv/g2';

const weeks = ['W1', 'W2', 'W3', 'W4'];
const regions = [
  { region: 'North', totals: [18, 24, 33, 42] },
  { region: 'Central', totals: [22, 24, 20, 30] },
  { region: 'South', totals: [9, 24, 29, 36] },
];
const data = regions.flatMap(({ region, totals }) =>
  totals.map((tickets, i) => ({ region, week: weeks[i], tickets })),
);

// Leave room for labels of the nested panel axes.
const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingLeft: 56,
  paddingBottom: 36,
});

chart.options({
  type: 'facetRect',
  title: 'Weekly tickets (count)',
  data,
  encode: { x: 'region' },
  scale: {
    x: { domain: regions.map(({ region }) => region) },
  },
  axis: { x: { title: false } },
  legend: false,
  children: [
    {
      type: 'interval',
      encode: { x: 'week', y: 'tickets', color: 'region' },
      scale: {
        x: { type: 'band', domain: weeks, padding: 0.25 },
        color: { domain: ['North', 'Central', 'South'], range: ['#2563EB', '#0F766E', '#B45309'] },
        y: { type: 'linear', domain: [0, 50], nice: false, tickCount: 6 },
      },
      axis: { x: { title: false }, y: { title: false } },
      tooltip: { title: 'week', items: ['region', 'tickets'] },
    },
  ],
});

chart.render();
