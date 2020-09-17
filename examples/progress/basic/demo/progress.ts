import { Progress } from '@antv/g2plot';

const progress = new Progress('container', {
  height: 100,
  width: 300,
  autoFit: false,
  percent: 0.7,
});

progress.render();
