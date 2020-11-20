import { Progress } from '@antv/g2plot';

const progress = new Progress('container', {
  height: 100,
  width: 300,
  autoFit: false,
  percent: 0.536,
  barWidthRatio: 0.3,
  color: ['#F4664A', '#E8EDF3'],
});

progress.render();
