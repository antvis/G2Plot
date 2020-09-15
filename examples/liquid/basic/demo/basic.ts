import { Liquid } from '@antv/g2plot';

const liquidPlot = new Liquid(document.getElementById('container'), {
  percent: 0.75,
});
liquidPlot.render();
