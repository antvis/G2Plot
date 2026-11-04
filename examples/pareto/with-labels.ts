import { Chart } from '@antv/g2';

/**
 * 带数据标签的帕累托图
 * 场景：质量复盘报告需要同时直接读取各类问题数量与累计占比
 * 要点：柱形标签显示次数，折线标签将 0~1 的累计占比格式化为百分比
 */
const qualityIssues = [
  { issueType: '外观划痕', issueCount: 12 },
  { issueType: '包装破损', issueCount: 48 },
  { issueType: '其他', issueCount: 4 },
  { issueType: '标签错误', issueCount: 30 },
  { issueType: '功能异常', issueCount: 8 },
  { issueType: '零件缺失', issueCount: 18 },
];

const totalIssues = qualityIssues.reduce(
  (total, issue) => total + issue.issueCount,
  0,
);
let cumulativeIssues = 0;
const data = [...qualityIssues]
  .sort((firstIssue, secondIssue) => secondIssue.issueCount - firstIssue.issueCount)
  .map((issue) => {
    cumulativeIssues += issue.issueCount;
    return {
      ...issue,
      cumulativePercentage: cumulativeIssues / totalIssues,
    };
  });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'interval',
      encode: { x: 'issueType', y: 'issueCount' },
      style: { fill: '#5B8FF9' },
      labels: [
        {
          text: 'issueCount',
          position: 'outside',
          style: { fontSize: 11, fill: '#595959' },
        },
      ],
      axis: { y: { title: '问题数量（次）' } },
      tooltip: {
        title: 'issueType',
        items: [{ channel: 'y', name: '问题数量', valueFormatter: (value) => `${value} 次` }],
      },
    },
    {
      type: 'line',
      encode: { x: 'issueType', y: 'cumulativePercentage' },
      scale: { y: { independent: true, domain: [0, 1] } },
      style: { stroke: '#F4664A', lineWidth: 2 },
      labels: [
        {
          text: (issue: { cumulativePercentage: number }) =>
            `${(issue.cumulativePercentage * 100).toFixed(1)}%`,
          position: 'top',
          style: { fontSize: 11, fill: '#F4664A', dy: -4 },
        },
      ],
      axis: {
        y: {
          position: 'right',
          title: '累计占比',
          labelFormatter: (value: number) => `${(value * 100).toFixed(0)}%`,
        },
      },
      tooltip: {
        title: 'issueType',
        items: [
          {
            channel: 'y',
            name: '累计占比',
            valueFormatter: (value) => `${(value * 100).toFixed(1)}%`,
          },
        ],
      },
    },
  ],
});

chart.render();
