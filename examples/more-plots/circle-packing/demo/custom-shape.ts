import { CirclePacking } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/%24m0nDoQYqH/basic-packing.json')
  .then((data) => data.json())
  .then((data) => {
    const box = document.querySelector('#container').getBoundingClientRect();
    const diameter = Math.min(box.width, box.height);

    const plot = new CirclePacking('container', {
      // todo 必须 宽高相等（内置处理）
      width: diameter,
      height: diameter,
      autoFit: false,
      padding: 0,
      data,
      sizeField: 'r',
      rawFields: ['name'],
      size: ({ r, name }) => {
        console.info(r, name);
        return r * diameter * (name === 'root' ? 1 : 0.5);
      },
      label: false,
      legend: false,
      shape: 'diamond',
    });

    plot.render();
  });
