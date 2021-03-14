import { RadialBar } from '@antv/g2plot';

const data = [
  { term: 'Zombieland', count: 9 },
  { term: 'Wieners', count: 8 },
  { term: 'Toy Story', count: 8 },
  { term: 'trashkannon', count: 7 },
  { term: 'the GROWLERS', count: 6 },
  { term: 'mudweiser', count: 6 },
  { term: 'ThunderCats', count: 4 },
  { term: 'The Taqwacores - Motion Picture', count: 4 },
  { term: 'The Shawshank Redemption', count: 2 },
  { term: 'The Olivia Experiment', count: 1 },
];

const bar = new RadialBar('container', {
  data,
  xField: 'term',
  yField: 'count',
  radius: 1,
  innerRadius: 0.4,
  // 设置坐标系的起始角度和终止角度
  startAngle: Math.PI * 0.5,
  endAngle: Math.PI * 2.5,
  tooltip: {
    showMarkers: true,
  },
  type: 'line',
  annotations: [
    {
      type: 'text',
      position: ['50%', '50%'],
      content: 'Music',
      style: {
        textAlign: 'center',
        fontSize: 24,
      },
    },
  ],
});
bar.render();
