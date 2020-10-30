import { TinyColumn } from '@antv/g2plot';

const data = [274, 337, 81, 497, 666, 219, 269];

const tinyColumn = new TinyColumn('container', {
  height: 64,
  width: 240,
  autoFit: false,
  data,
  tooltip: false,
  annotations: [
    // 平均值
    {
      type: 'line',
      start: ['min', 'mean'],
      end: ['max', 'mean'],
      text: {
        content: '平均值',
        offsetY: -2,
        style: {
          textAlign: 'left',
          fontSize: 10,
          fill: 'rgba(44, 53, 66, 0.45)',
          textBaseline: 'bottom',
        },
      },
      style: {
        stroke: 'rgba(0, 0, 0, 0.25)',
      },
    },
  ],
});

tinyColumn.render();
