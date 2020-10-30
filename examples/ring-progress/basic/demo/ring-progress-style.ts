import { RingProgress } from '@antv/g2plot';

const ringProgress = new RingProgress('container', {
  height: 100,
  width: 100,
  autoFit: false,
  percent: 0.6,
  color: ['#F4664A', '#E8EDF3'],
  innerRadius: 0.85,
  radius: 0.98,
});

ringProgress.render();
