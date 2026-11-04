/**
 * 带图例与差值标签的哑铃图
 * 场景：按满意度变化排序，比较各部门两个年度的得分并直接展示差值
 * 要点：point 使用长表和 color 通道生成图例；text 在连线中点展示差值；
 *       scale.y.domain 固定按差值降序排列的部门顺序
 */
import { Chart } from '@antv/g2';

const data = [
  { department: '研发', previousScore: 72, currentScore: 85 },
  { department: '产品', previousScore: 78, currentScore: 83 },
  { department: '设计', previousScore: 81, currentScore: 79 },
  { department: '市场', previousScore: 68, currentScore: 76 },
  { department: '销售', previousScore: 74, currentScore: 70 },
  { department: '客服', previousScore: 82, currentScore: 88 },
];

const chartData = data
  .map((d) => ({
    ...d,
    scoreChange: d.currentScore - d.previousScore,
  }))
  .sort((a, b) => b.scoreChange - a.scoreChange)
  .map((d) => ({
    ...d,
    midpointScore: (d.previousScore + d.currentScore) / 2,
    changeLabel: `${d.scoreChange > 0 ? '+' : ''}${d.scoreChange}`,
  }));

const endpointData = chartData.flatMap((d) => [
  { department: d.department, period: '2025 年', score: d.previousScore },
  { department: d.department, period: '2026 年', score: d.currentScore },
]);

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: chartData,
  scale: {
    y: {
      type: 'point',
      domain: chartData.map((d) => d.department),
      padding: 0.5,
    },
    color: {
      domain: ['2025 年', '2026 年'],
      range: ['#8CA8C8', '#2F6BFF'],
    },
  },
  axis: {
    x: { title: '员工满意度（分）' },
    y: { title: '部门（按变化降序）' },
  },
  legend: { color: { position: 'top' } },
  children: [
    {
      type: 'link',
      encode: {
        x: ['previousScore', 'currentScore'],
        y: ['department', 'department'],
      },
      style: { stroke: '#D9D9D9', lineWidth: 3 },
      tooltip: false,
    },
    {
      type: 'point',
      data: endpointData,
      encode: { x: 'score', y: 'department', color: 'period' },
      style: { r: 6, stroke: '#FFFFFF', lineWidth: 1 },
    },
    {
      type: 'text',
      encode: {
        x: 'midpointScore',
        y: 'department',
        text: 'changeLabel',
      },
      style: {
        dy: -12,
        fontSize: 12,
        fontWeight: 'bold',
        fill: '#595959',
        textAlign: 'center',
      },
      tooltip: false,
    },
  ],
});

chart.render();
