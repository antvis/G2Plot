import { Chart } from '@antv/g2';

/**
 * 横向棒棒糖图
 * 场景：类别名称较长（部门名、商品全称、城市名）或类别数量偏多（8~15 项），
 *       纵向排列时 x 轴标签会重叠
 * 要点：把数值放到 x 通道、类别放到 y 通道即可横向；
 *       link 的 x 传 [baseline, value]，y 传 [category, category]
 */
const data = [
  { department: '客户成功部', headcount: 86, baseline: 0 },
  { department: '产品研发部', headcount: 132, baseline: 0 },
  { department: '市场增长部', headcount: 64, baseline: 0 },
  { department: '供应链管理部', headcount: 41, baseline: 0 },
  { department: '财务与法务部', headcount: 28, baseline: 0 },
  { department: '人力资源部', headcount: 22, baseline: 0 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'link',
      encode: { x: ['baseline', 'headcount'], y: ['department', 'department'] },
      style: { stroke: '#5AD8A6', lineWidth: 2 },
      tooltip: false,
    },
    {
      type: 'point',
      encode: { x: 'headcount', y: 'department' },
      style: { r: 5, fill: '#5AD8A6', stroke: '#fff', lineWidth: 2 },
    },
  ],
  axis: {
    x: { title: '在职人数（人）' },
    y: { title: '部门' },
  },
  tooltip: {
    title: 'department',
    items: [{ channel: 'x', name: '在职人数', valueFormatter: (v) => `${v} 人` }],
  },
});

chart.render();
