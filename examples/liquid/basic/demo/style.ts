import { Liquid } from '@antv/g2plot';

const liquidPlot = new Liquid(document.getElementById('container'), {
  width: 600,
  height: 300,
  autoFit: false,
  percent: 0.75,
  statistic: {
    content: {
      formatter: ({ percent }) => {
        return `占比${percent * 100}%`;
      },
    },
  },
  liquidStyle: ({ percent }) => {
    return {
      fill: percent > 0.75 ? 'red' : '#acc9ff',
    };
  },
  color: () => '#acc9ff',
});
liquidPlot.render();
