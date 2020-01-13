import { Liquid } from '@antv/g2plot';

const liquidPlot = new Liquid(document.getElementById('container'), {
  title: {
    visible: true,
    text: '水波图',
  },
  description: {
    visible: true,
    text: '水波图 - 百分比显示',
  },
  min: 0,
  max: 10000,
  value: 5639,
  statistic: {
    formatter: (value) => ((100 * value) / 10000).toFixed(1) + '%',
  },
});
liquidPlot.render();
