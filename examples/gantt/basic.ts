import { Chart } from '@antv/g2';

/**
 * 基础甘特图
 * 场景：展示项目任务的起止时间与阶段划分
 * 要点：interval + transpose 实现水平时间条，y/y1 分别映射开始/结束时间
 */
const data = [
  { task: '需求调研', phase: '规划', startDate: new Date('2026-03-02'), endDate: new Date('2026-03-06') },
  { task: '方案设计', phase: '规划', startDate: new Date('2026-03-05'), endDate: new Date('2026-03-11') },
  { task: '接口开发', phase: '开发', startDate: new Date('2026-03-10'), endDate: new Date('2026-03-20') },
  { task: '页面开发', phase: '开发', startDate: new Date('2026-03-12'), endDate: new Date('2026-03-24') },
  { task: '联调测试', phase: '测试', startDate: new Date('2026-03-23'), endDate: new Date('2026-03-27') },
  { task: '上线验收', phase: '发布', startDate: new Date('2026-03-28'), endDate: new Date('2026-03-31') },
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
  type: 'interval',
  data,
  encode: {
    x: 'task',
    y: 'startDate',
    y1: 'endDate',
    color: 'phase',
  },
  scale: {
    y: { type: 'time' },
    color: { range: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#E8684A'] },
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  axis: {
    x: { title: '任务' },
    y: { title: '2026 年 3 月', labelFormatter: formatMonthDay },
  },
  style: { radius: 4 },
});

chart.render();
