import { Liquid } from '@antv/g2plot';

const liquidPlot = new Liquid(document.getElementById('container'), {
  title: {
    visible: true,
    text: '水波图',
  },
  min: 0,
  max: 10000,
  value: 5639,
});
liquidPlot.render();
