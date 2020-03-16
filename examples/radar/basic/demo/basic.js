import { Radar } from '@antv/g2plot';

const data = [
  {
    item: 'Design',
    score: 70,
  },
  {
    item: 'Development',
    score: 60,
  },
  {
    item: 'Marketing',
    score: 60,
  },
  {
    item: 'Users',
    score: 40,
  },
  {
    item: 'Test',
    score: 60,
  },
  {
    item: 'Language',
    score: 70,
  },
  {
    item: 'Technology',
    score: 50,
  },
  {
    item: 'Support',
    score: 30,
  },
  {
    item: 'Sales',
    score: 60,
  },
  {
    item: 'UX',
    score: 50,
  },
];
const radarPlot = new Radar(document.getElementById('container'), {
  title: {
    visible: true,
    text: '基础雷达图',
  },
  data,
  angleField: 'item',
  radiusField: 'score',
  radiusAxis: {
    grid: {
      alternateColor: ['rgba(0, 0, 0, 0.04)', null],
    },
  },
  area: {
    visible: false,
  },
  point: {
    visible: true,
  },
});
radarPlot.render();
