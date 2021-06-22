import { CirclePacking } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/%24m0nDoQYqH/basic-packing.json')
  .then((data) => data.json())
  .then((data) => {
    const plot = new CirclePacking('container', {
      autoFit: true,
      data,
      label: false,
      legend: false,
      hierarchyConfig: {
        sort: (a, b) => b.depth - a.depth,
      },
    });

    plot.render();
  });
