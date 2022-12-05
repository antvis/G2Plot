import { Venn } from '@antv/g2plot';

const plot = new Venn('container', {
  data: [
    { sets: ['A'], size: 102, label: 'A' },
    { sets: ['B'], size: 12, label: 'B' },
    { sets: ['C'], size: 12, label: 'C' },
    { sets: ['A', 'B'], size: 2, label: 'A&B' },
    { sets: ['A', 'C'], size: 2, label: 'A&C' },
    { sets: ['B', 'C'], size: 2, label: 'B&C' },
    { sets: ['A', 'B', 'C'], size: 1 },
  ],
  setsField: 'sets',
  sizeField: 'size',
  pointStyle: { fillOpacity: 0.85 },
  color: (datum, defaultColor) => {
    if (datum.size > 100) {
      return '#FF4500';
    }
    return defaultColor;
  },
});
plot.render();
