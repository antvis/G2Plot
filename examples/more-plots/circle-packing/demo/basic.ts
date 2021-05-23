import { CirclePacking } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/%24m0nDoQYqH/basic-packing.json')
  .then((data) => data.json())
  .then((data) => {
    const box = document.querySelector('#container').getBoundingClientRect();
    const diameter = Math.min(box.width, box.height) * 0.8;

    const plot = new CirclePacking('container', {
      // todo 必须 宽高相等（内置处理）
      width: diameter,
      height: diameter,
      autoFit: false,
      data,
      sizeField: 'r',
      size: ({ r }) => r * diameter,
      label: false,
      legend: false,
      hierarchyConfig: {
        sort: (a, b) => b.depth - a.depth,
      },
    });

    plot.render();
  });
