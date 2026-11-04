import { Chart } from '@antv/g2';

/**
 * 带 80% 参考线的帕累托图
 * 场景：用 80/20 分析法定位累计贡献达到 80% 的关键质量问题
 * 要点：lineY 标注 0.8；参考线与累计折线使用相同的独立百分比轴范围
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
    {
      type: 'lineY',
      data: [0.8],
      scale: { y: { independent: true, domain: [0, 1] } },
      style: { stroke: '#FAAD14', strokeDasharray: '4 4', lineWidth: 1.5 },
      axis: { y: false },
      labels: [
        {
          text: '80% 参考线',
          position: 'right',
          style: { fill: '#FAAD14', fontSize: 11 },
        },
      ],
    },
  ],
});

chart.render();
