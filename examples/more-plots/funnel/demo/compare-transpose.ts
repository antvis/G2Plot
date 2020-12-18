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
  isTransposed: true,
  conversionTag: {
    offsetX: 10,
    style: {
      fill: '#666',
      fontSize: 12,
    },
    formatter: (data) => `占比${(data.$$percentage$$ * 100).toFixed(2)}%`,
  },
  legend: false,
});
funnelPlot.render();
