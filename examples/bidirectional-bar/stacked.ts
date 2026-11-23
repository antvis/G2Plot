/**
 * 课程问卷对比：将不赞同分层堆叠在左，将赞同分层堆叠在右
 * 百分比以该题全部答卷为分母；中立项不画，也不重新归一化
 * 使用正负分离的 stackY，对称域按两侧堆叠合计而不是单个分段计算
 */
import { Chart } from '@antv/g2';

const surveys = [
  { topic: 'Pacing', stronglyDisagree: 6, disagree: 19, neutral: 23, agree: 37, stronglyAgree: 15 },
  { topic: 'Materials', stronglyDisagree: 3, disagree: 12, neutral: 20, agree: 39, stronglyAgree: 26 },
  { topic: 'Exercises', stronglyDisagree: 11, disagree: 24, neutral: 18, agree: 31, stronglyAgree: 16 },
];

const levels = ['Strongly disagree', 'Disagree', 'Agree', 'Strongly agree'];
const data = surveys.flatMap(({ topic, stronglyDisagree, disagree, agree, stronglyAgree }) =>
  [stronglyDisagree, disagree, agree, stronglyAgree].map((percent, i) => ({
    topic,
    opinion: levels[i],
    percent,
    signedPercent: i < 2 ? -percent : percent,
  })),
);
const maxTotal = Math.max(
  ...surveys.flatMap((d) => [d.stronglyDisagree + d.disagree, d.agree + d.stronglyAgree]),
);
const limit = Math.max(10, Math.ceil(maxTotal / 10) * 10);

const chart = new Chart({ container: 'container', autoFit: true });

chart.options({
  type: 'interval',
  coordinate: { transform: [{ type: 'transpose' }] },
  data,
  transform: [{ type: 'stackY' }],
  encode: { x: 'topic', y: 'signedPercent', color: 'opinion' },
  scale: {
    x: { domain: surveys.map((d) => d.topic), padding: 0.35 },
    y: { type: 'linear', domain: [-limit, limit], nice: false, tickCount: 5 },
    color: { domain: levels, range: ['#9A3412', '#F59E0B', '#60A5FA', '#1D4ED8'] },
  },
  axis: {
    x: { title: false },
    y: {
      title: 'Share of all responses (neutral not shown)',
      labelFormatter: (value: number | string) => `${Math.abs(Number(value))}%`,
    },
  },
  tooltip: { title: 'topic', items: [{ field: 'opinion', name: 'Response' }, { field: 'percent', name: 'Share (%)' }] },
});

chart.render();
