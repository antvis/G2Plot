import { Box } from '@antv/g2plot';

const data = [
  { x: '职业 A', low: 20000, q1: 26000, median: 27000, q3: 32000, high: 38000, outliers: [50000, 52000] },
  { x: '职业 B', low: 40000, q1: 49000, median: 62000, q3: 73000, high: 88000, outliers: [32000, 29000, 106000] },
  { x: '职业 C', low: 52000, q1: 59000, median: 65000, q3: 74000, high: 83000, outliers: [91000] },
  { x: '职业 D', low: 58000, q1: 96000, median: 130000, q3: 170000, high: 200000, outliers: [42000, 210000, 215000] },
  { x: '职业 E', low: 24000, q1: 28000, median: 32000, q3: 38000, high: 42000, outliers: [48000] },
  { x: '职业 F', low: 47000, q1: 56000, median: 69000, q3: 85000, high: 100000, outliers: [110000, 115000, 32000] },
  { x: '职业 G', low: 64000, q1: 74000, median: 83000, q3: 93000, high: 100000, outliers: [110000] },
  { x: '职业 H', low: 67000, q1: 72000, median: 84000, q3: 95000, high: 110000, outliers: [57000, 54000] },
];

const outliersBoxPlot = new Box('container', {
  data,
  xField: 'x',
  yField: ['low', 'q1', 'median', 'q3', 'high'],
  outliersField: 'outliers',
  outliersStyle: {
    fill: '#f6f',
  },
  label: {
    style: {
      textBaseline: 'top',
    },
    layout: { type: 'hide-overlap' },
  },
});

outliersBoxPlot.render();
