import { Liquid } from '@antv/g2plot';

const liquidPlot = new Liquid('container', {
  percent: 0.25,
  shape: function (x, y, width, height) {
    const r = width / 4;
    const dx = x - width / 2;
    const dy = y - height / 2;
    return [
      ['M', dx, dy + r * 2],
      ['A', r, r, 0, 0, 1, x, dy + r],
      ['A', r, r, 0, 0, 1, dx + width, dy + r * 2],
      ['L', x, dy + height],
      ['L', dx, dy + r * 2],
      ['Z'],
    ];
  },
  outline: {
    border: 4,
    distance: 8,
  },
  wave: {
    length: 128,
  },
});

liquidPlot.render();
