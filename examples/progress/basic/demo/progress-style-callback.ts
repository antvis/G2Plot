import { Progress } from '@antv/g2plot';

const progress = new Progress('container', {
  height: 100,
  width: 300,
  autoFit: false,
  percent: 0.7,
  progressStyle: ({ percent, type }) => {
    if (type === 'current') {
      return { fill: 'green' };
    }
    return { fill: '#999', lineDash: [1, 1], stroke: '#333' };
  },
});

progress.render();
