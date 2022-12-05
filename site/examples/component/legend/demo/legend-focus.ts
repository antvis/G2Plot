import { Column } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/PC3daFYjNw/column-data.json')
  .then((data) => data.json())
  .then((data) => {
    const plot = new Column('container', {
      data,
      xField: 'city',
      yField: 'value',
      seriesField: 'type',
      isGroup: 'true',
      legend: {
        selected: {
          // 默认置灰
          茶叶: false,
        },
      },
    });

    plot.render();
  });
