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
  width: 400,
  height: 300,
  data,
  xField: 'term',
  yField: 'count',
  radius: 0.8,
  innerRadius: 0.2,
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
