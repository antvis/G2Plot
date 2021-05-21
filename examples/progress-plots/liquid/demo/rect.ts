import { Liquid } from '@antv/g2plot';

const liquidPlot = new Liquid('container', {
  percent: 0.25,
  shape: 'rect',
  outline: {
    border: 2,
    distance: 4,
  },
  wave: {
    length: 128,
  },
});

liquidPlot.render();
