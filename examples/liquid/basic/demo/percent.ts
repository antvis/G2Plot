import { Liquid } from '@antv/g2plot';

const liquidPlot = new Liquid(document.getElementById('container'), {
  width: 600,
  height: 300,
  autoFit: false,
  percent: 0.75,
  liquidStyle: (v) => {
    return {
      fill: v > 0.75 ? 'red' : '#3b78e775',
    };
  },
  color: () => '#3b78e775',
  statistic: {
    formatter: (v) => {
      return `占比${v * 100}%`;
    },
  },
});
liquidPlot.render();
