import { Liquid } from '@antv/g2plot';

const liquidPlot = new Liquid('container', {
  percent: 0.25,
  outline: {
    border: 4,
    distance: 8,
  },
  wave: {
    length: 128,
  },
});
liquidPlot.render();
