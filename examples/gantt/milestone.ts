import { Chart } from '@antv/g2';

/**
 * 带里程碑的甘特图
 * 场景：任务排期之外，还要标出评审、提测、发布等关键节点
 * 要点：view 组合 interval（任务条）与 point（里程碑菱形），两者共享 y 时间轴
 */
const tasks = [
  { task: '需求调研', phase: '规划', startDate: new Date('2026-03-02'), endDate: new Date('2026-03-06') },
  { task: '方案设计', phase: '规划', startDate: new Date('2026-03-05'), endDate: new Date('2026-03-11') },
  { task: '接口开发', phase: '开发', startDate: new Date('2026-03-10'), endDate: new Date('2026-03-20') },
  { task: '页面开发', phase: '开发', startDate: new Date('2026-03-12'), endDate: new Date('2026-03-24') },
  { task: '联调测试', phase: '测试', startDate: new Date('2026-03-23'), endDate: new Date('2026-03-27') },
  { task: '上线验收', phase: '发布', startDate: new Date('2026-03-28'), endDate: new Date('2026-03-31') },
];

const milestones = [
  { task: '需求调研', milestone: '需求评审', date: new Date('2026-03-06') },
  { task: '方案设计', milestone: '设计定稿', date: new Date('2026-03-11') },
  { task: '接口开发', milestone: '提测', date: new Date('2026-03-20') },
  { task: '联调测试', milestone: '测试通过', date: new Date('2026-03-27') },
  { task: '上线验收', milestone: '正式上线', date: new Date('2026-03-31') },
];

const formatMonthDay = (value: Date) => {
  const date = new Date(value);
  return `${date.getMonth() + 1}-${date.getDate()}`;
};

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  scale: { y: { type: 'time' } },
  children: [
    {
      type: 'interval',
      data: tasks,
      encode: { x: 'task', y: 'startDate', y1: 'endDate', color: 'phase' },
      scale: { color: { range: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#E8684A'] } },
      coordinate: { transform: [{ type: 'transpose' }] },
      style: { radius: 4 },
    },
    {
      type: 'point',
      data: milestones,
      encode: { x: 'task', y: 'date', shape: 'diamond' },
      coordinate: { transform: [{ type: 'transpose' }] },
      style: { fill: '#E8684A', r: 6 },
      labels: [
        {
          text: 'milestone',
          position: 'right',
          style: { fontSize: 10, fill: '#8c8c8c' },
        },
      ],
      tooltip: { title: 'milestone' },
    },
  ],
  axis: {
    x: { title: '任务' },
    y: { title: '2026 年 3 月', labelFormatter: formatMonthDay },
  },
});

chart.render();
