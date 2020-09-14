import { Liquid } from '@antv/g2plot';

const liquidPlot = new Liquid(document.getElementById('container'), {
  width: 600,
  height: 300,
  autoFit: false,
  percent: 0.75,
});
liquidPlot.render();
