import { RadialBar } from '@antv/g2plot';

const data = [
  { question: '问题 1', percent: 0.21 },
  { question: '问题 2', percent: 0.4 },
  { question: '问题 3', percent: 0.49 },
  { question: '问题 4', percent: 0.52 },
  { question: '问题 5', percent: 0.53 },
  { question: '问题 6', percent: 0.84 },
  { question: '问题 7', percent: 1.0 },
  { question: '问题 8', percent: 1.2 },
];

const bar = new RadialBar('container', {
  width: 400,
  height: 300,
  data,
  xField: 'question',
  yField: 'percent',
  // maxRadian: 90, //最大弧度,
  colorField: 'percent',
  color: ['#BAE7FF', '#1890FF', '#0050B3'],
  tooltip: {
    formatter: (datum) => {
      return { name: '占比', value: datum.percent * 100 + '%' };
    },
  },
});
bar.render();
