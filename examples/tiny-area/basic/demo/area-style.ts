import { TinyArea } from '@antv/g2plot';

const tinyArea = new TinyArea('container', {
  height: 60,
  width: 300,
  autoFit: false,
  data: new Array(100).fill(0).map(() => Math.random() * 100),
  smooth: true,
  lineStyle: {
    lineDash: [2, 2],
    stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
  },
  areaStyle: {
    fill: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
  },
});

tinyArea.render();
