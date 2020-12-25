import { Funnel } from '@antv/g2plot';

const data = [
  { stage: '简历筛选', number: 253, company: 'A公司' },
  { stage: '初试人数', number: 151, company: 'A公司' },
  { stage: '复试人数', number: 113, company: 'A公司' },
  { stage: '录取人数', number: 87, company: 'A公司' },
  { stage: '入职人数', number: 59, company: 'A公司' },
  { stage: '简历筛选', number: 303, company: 'B公司' },
  { stage: '初试人数', number: 251, company: 'B公司' },
  { stage: '复试人数', number: 153, company: 'B公司' },
  { stage: '录取人数', number: 117, company: 'B公司' },
  { stage: '入职人数', number: 79, company: 'B公司' },
];

const funnelPlot = new Funnel('container', {
  data,
  xField: 'stage',
  yField: 'number',
  compareField: 'company',
  meta: {
    stage: {
      alias: '行为',
    },
    pv: {
      alias: '人数',
      formatter: (v) => `${v}次`,
    },
  },
  tooltip: {
    fields: ['stage', 'number', 'company'],
    formatter: (v) => ({
      name: `${v.company}的${v.stage}`,
      value: v.number,
    }),
  },
  legend: false,
});
funnelPlot.render();
