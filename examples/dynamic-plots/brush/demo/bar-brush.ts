import { Bar } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/v6MvZBUBsQ/column-data.json')
  .then((res) => res.json())
  .then((data) => {
    const plot = new Bar('container', {
      data,
      xField: 'count',
      yField: 'release',
      meta: {
        count: {
          alias: 'top2000 唱片总量',
          nice: true,
        },
        release: {
          tickInterval: 5,
          alias: '唱片发行年份',
        },
      },
      brush: {
        enabled: true,
        action: 'highlight',
      },
    });

    plot.render();
  });
