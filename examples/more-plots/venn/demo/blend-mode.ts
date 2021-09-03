import { Venn } from '@antv/g2plot';

const plot = new Venn('container', {
  appendPadding: [10, 20, 40, 20],
  data: [
    { sets: ['A'], size: 12, label: 'A' },
    { sets: ['B'], size: 12, label: 'B' },
    { sets: ['C'], size: 12, label: 'C' },
    { sets: ['A', 'B'], size: 2, label: 'A&B' },
    { sets: ['A', 'C'], size: 2, label: 'A&C' },
    { sets: ['B', 'C'], size: 2, label: 'B&C' },
    { sets: ['A', 'B', 'C'], size: 1 },
  ],
  // more blendMode to see: https://gka.github.io/chroma.js/#chroma-blend
  blendMode: 'overlay',
  pointStyle: { fillOpacity: 0.85 },
});
plot.render();
