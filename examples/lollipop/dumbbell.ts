import { Chart } from '@antv/g2';

/**
 * 哑铃图（实际值 vs 目标值）
 * 场景：同一类别下两个指标的差距对比（实际 vs 目标、今年 vs 去年），
 *       差距本身比单个数值更值得关注
 * 要点：一条 link 连接两个数值端点，再叠两个 point 分别标记；
 *       两个端点用不同颜色，配合 legend 区分类别，缺口用 color 标注
 */
const data = [
  { region: '华东', actual: 152, target: 140 },
  { region: '华南', actual: 118, target: 130 },
  { region: '华北', actual: 96, target: 105 },
  { region: '西南', actual: 74, target: 60 },
  { region: '西北', actual: 42, target: 55 },
].map((d) => ({ ...d, gap: d.actual - d.target }));

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      // 连接实际值与目标值
      type: 'link',
      encode: { x: ['region', 'region'], y: ['target', 'actual'] },
      style: { stroke: '#bfbfbf', lineWidth: 4, strokeOpacity: 0.9 },
      tooltip: false,
    },
    {
      type: 'point',
      encode: { x: 'region', y: 'actual' },
      style: { r: 6, fill: '#5B8FF9', stroke: '#fff', lineWidth: 2 },
    },
    {
      type: 'point',
      encode: { x: 'region', y: 'target' },
      style: { r: 6, fill: '#FF9845', stroke: '#fff', lineWidth: 2 },
    },
  ],
  axis: {
    x: { title: '大区' },
    y: { title: '达成量（万元）' },
  },
  legend: false,
  tooltip: {
    title: 'region',
    items: [
      { field: 'actual', name: '实际', valueFormatter: (v) => `${v} 万元` },
      { field: 'target', name: '目标', valueFormatter: (v) => `${v} 万元` },
      { field: 'gap', name: '缺口', valueFormatter: (v) => `${v > 0 ? '+' : ''}${v} 万元` },
    ],
  },
});

chart.render();
