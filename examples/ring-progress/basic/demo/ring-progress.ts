import { RingProgress } from '@antv/g2plot';

const ringProgress = new RingProgress('container', {
  height: 100,
  width: 100,
  autoFit: false,
  percent: 0.7,
  color: ['#5B8FF9', '#E8EDF3'],
});

ringProgress.render();
