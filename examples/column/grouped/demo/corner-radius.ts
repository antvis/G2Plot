import { Column } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/PC3daFYjNw/column-data.json')
  .then((data) => data.json())
  .then((data) => {
    const column = new Column('container', {
      data,
      xField: 'city',
      yField: 'value',
      seriesField: 'type',
      isGroup: 'true',
      columnStyle: {
        radius: [20, 20, 0, 0],
      },
    });

    column.render();
  });
