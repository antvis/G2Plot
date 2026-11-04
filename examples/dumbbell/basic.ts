/**
 * 基础哑铃图
 * 场景：部门两年度员工满意度对比，最简起步
 * 要点：link 连接每条记录的两个端点，两个 point 分别映射历史值和当前值
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

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  scale: {
    y: { type: 'point', padding: 0.5 },
  },
  axis: {
    x: { title: '员工满意度（分）' },
    y: { title: '部门' },
  },
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
      encode: { x: 'previousScore', y: 'department' },
      style: { r: 6, fill: '#8CA8C8', stroke: '#FFFFFF', lineWidth: 1 },
    },
    {
      type: 'point',
      encode: { x: 'currentScore', y: 'department' },
      style: { r: 6, fill: '#2F6BFF', stroke: '#FFFFFF', lineWidth: 1 },
    },
  ],
});

chart.render();
