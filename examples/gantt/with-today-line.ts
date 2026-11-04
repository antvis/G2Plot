import { Chart } from '@antv/g2';

/**
 * 带今日线与工期标签的甘特图
 * 场景：项目进行中，需要一眼看出当前进度位置与每个任务的工期
 * 要点：lineY 标记“今日”参考线（transpose 后变为竖线）；
 *       interval 的 labels 用回调计算工期天数并居中展示
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
  type: 'view',
  scale: { y: { type: 'time' } },
  children: [
    {
      type: 'interval',
      data,
      encode: { x: 'task', y: 'startDate', y1: 'endDate', color: 'phase' },
      scale: { color: { range: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#E8684A'] } },
      coordinate: { transform: [{ type: 'transpose' }] },
      labels: [
        {
          text: (d: { startDate: Date; endDate: Date }) =>
            `${Math.round((+d.endDate - +d.startDate) / 86400000)} 天`,
          position: 'inside',
          style: { fill: '#fff', fontSize: 11 },
        },
      ],
      style: { radius: 4 },
    },
    {
      // 今日参考线：transpose 后 lineY 变为垂直的日期分隔线
      type: 'lineY',
      data: [{ today: new Date('2026-03-16') }],
      encode: { y: 'today' },
      coordinate: { transform: [{ type: 'transpose' }] },
      style: { stroke: '#E8684A', lineWidth: 1, lineDash: [4, 3] },
      tooltip: false,
    },
  ],
  axis: {
    x: { title: '任务' },
    y: { title: '2026 年 3 月', labelFormatter: formatMonthDay },
  },
  legend: { color: { position: 'top' } },
});

chart.render();
