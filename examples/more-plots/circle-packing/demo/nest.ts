import { CirclePacking } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/flare.json')
  .then((data) => data.json())
  .then((data) => {
    const plot = new CirclePacking('container', {
      autoFit: true,
      padding: 0,
      data,
      sizeField: 'r',
      // 自定义颜色
      colorField: 'r',
      color: 'rgb(252, 253, 191)-rgb(231, 82, 99)-rgb(183, 55, 121)',
      // 自定义样式
      pointStyle: {
        stroke: 'rgb(183, 55, 121)',
        lineWidth: 0.5,
      },
      label: false,
      legend: false,
    });

    plot.render();
  });
