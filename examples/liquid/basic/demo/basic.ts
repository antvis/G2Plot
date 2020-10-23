import { Liquid } from '@antv/g2plot';

const liquidPlot = new Liquid('container', {
  percent: 0.25,
  statistic: {
    content: {
      style: {
        fontSize: 60,
        fill: 'black',
      },
    },
  },
});
liquidPlot.render();
