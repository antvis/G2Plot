import { Progress } from '@antv/g2plot';

const progress = new Progress('container', {
  height: 100,
  width: 300,
  autoFit: false,
  percent: 0.7,
  color: ['#5B8FF9', '#E8EDF3'],
});

progress.render();
