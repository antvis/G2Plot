import { Funnel } from '@antv/g2plot';

const data = [
  { stage: '简历筛选', number: 253 },
  { stage: '初试人数', number: 151 },
  { stage: '复试人数', number: 113 },
  { stage: '录取人数', number: 87 },
  { stage: '入职人数', number: 59 },
];

const funnelPlot = new Funnel('container', {
  data: data,
  xField: 'stage',
  yField: 'number',
  dynamicHeight: true,
  legend: false,
});

funnelPlot.render();
