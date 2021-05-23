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
      size: ({ r }) => r * diameter,
      color: 'rgb(252, 253, 191)-rgb(231, 82, 99)-rgb(183, 55, 121)',
      // 自定义 label 样式
      label: {
        formatter: ({ name }) => {
          return name !== 'root' ? name : '';
        },
        // 向下偏移
        offsetY: 8,
        style: {
          fontSize: 12,
          textAlign: 'center',
          fill: 'rgba(0,0,0,0.65)',
        },
      },
      legend: false,
    });

    plot.render();
  });
