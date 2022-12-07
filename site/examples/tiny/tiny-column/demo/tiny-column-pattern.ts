import { TinyColumn } from '@antv/g2plot';

const data = [274, 337, 81, 497, 666, 219, 269];

const tinyColumn = new TinyColumn('container', {
  height: 64,
  autoFit: false,
  data,
  tooltip: {
    customContent: function (x, data) {
      return `NO.${x}: ${data[0]?.data?.y.toFixed(2)}`;
    },
  },
  pattern: { type: 'line' },
});

tinyColumn.render();
