import { Funnel } from '../../../relation/sankey/demo/node_modules/@antv/g2plot';

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
  isTransposed: true,
  minSize: 0.3,
  maxSize: 0.8,
  label: {
    formatter: (datum) => {
      // 提供占比$$percentage$$，转化率$$conversion$$两种格式
      return `${datum.stage}:${datum.number}`;
    },
  },
  conversionTag: {
    formatter: (datum) => {
      // 提供占比$$percentage$$，转化率$$conversion$$两种格式
      return datum.$$conversion$$.toFixed(2);
    },
  },
  tooltip: {
    formatter: (datum) => {
      return { name: datum.stage, value: `${datum.number}个` };
    },
  },
});

funnelPlot.render();
