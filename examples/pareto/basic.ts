import { Chart } from '@antv/g2';

/**
 * 基础帕累托图
 * 场景：按质量问题的发生次数降序排列，识别累计贡献最高的关键少数问题
 * 要点：先排序并计算累计占比；interval 展示次数，line 使用独立右轴展示累计占比
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
      axis: { y: { title: '问题数量（次）' } },
    },
    {
      type: 'line',
      encode: { x: 'issueType', y: 'cumulativePercentage' },
      scale: { y: { independent: true, domain: [0, 1] } },
      style: { stroke: '#F4664A', lineWidth: 2 },
      axis: {
        y: {
          position: 'right',
          title: '累计占比',
          labelFormatter: (value: number) => `${(value * 100).toFixed(0)}%`,
        },
      },
    },
  ],
});

chart.render();
