import { TinyArea } from '@antv/g2plot';

const data = [
  264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
];

const tinyArea = new TinyArea('container', {
  height: 60,
  autoFit: false,
  data,
  smooth: true,
  color: '#E5EDFE',
  pattern: { type: 'line', cfg: { stroke: '#5B8FF9' } },
});

tinyArea.render();
