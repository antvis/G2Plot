import { Liquid } from '@antv/g2plot';

const plot = new Liquid('container', {
  percent: 0.65,
  shape: 'diamond',
  outline: {
    border: 4,
    distance: 8,
  },
  wave: {
    length: 128,
  },
  pattern: { type: 'line' },
});

plot.render();
