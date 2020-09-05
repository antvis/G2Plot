import { TinyColumn } from '@antv/g2plot';

const tinyColumn = new TinyColumn('container', {
  height: 60,
  width: 300,
  autoFit: false,
  data: new Array(100).fill(0).map(() => Math.random() * 100),
  columnWidthRatio: 0.9,
  meta: {
    y: {
      max: 150,
      min: -50,
    },
  },
});

tinyColumn.render();
