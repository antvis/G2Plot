import { Liquid } from '@antv/g2plot';

const liquidPlot = new Liquid('container', {
  percent: 0.25,
  shape: (x, y, width, height) => {
    const path = [];
    const w = Math.min(width, height);

    for (let i = 0; i < 5; i++) {
      path.push([
        i === 0 ? 'M' : 'L',
        (Math.cos(((18 + i * 72) * Math.PI) / 180) * w) / 2 + x,
        (-Math.sin(((18 + i * 72) * Math.PI) / 180) * w) / 2 + y,
      ]);
      path.push([
        'L',
        (Math.cos(((54 + i * 72) * Math.PI) / 180) * w) / 4 + x,
        (-Math.sin(((54 + i * 72) * Math.PI) / 180) * w) / 4 + y,
      ]);
    }
    path.push(['Z']);
    return path;
  },
  outline: {
    border: 4,
    distance: 8,
  },
  wave: {
    length: 128,
  },
  theme: {
    defaultColor: '#FAAD14',
  },
});

liquidPlot.render();
