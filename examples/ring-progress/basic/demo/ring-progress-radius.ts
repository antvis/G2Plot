import { RingProgress } from '@antv/g2plot';

const ringProgress = new RingProgress('container', {
  height: 100,
  width: 100,
  autoFit: false,
  percent: 0.7,
  innerRadius: 0.95,
  radius: 0.95,
});

ringProgress.render();
