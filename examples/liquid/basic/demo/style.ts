import { Liquid } from '@antv/g2plot';

const liquidPlot = new Liquid(document.getElementById('container'), {
  percent: 0.76,
  statistic: {
    content: {
      formatter: ({ percent }) => {
        return `占比 ${percent * 100}%`;
      },
      style: {
        fontSize: 60,
        fill: 'white',
      },
    },
  },
  liquidStyle: ({ percent }) => {
    return {
      fill: percent > 0.75 ? '#5B8FF9' : '#FAAD14',
    };
  },
  color: () => '#5B8FF9',
});
liquidPlot.render();
