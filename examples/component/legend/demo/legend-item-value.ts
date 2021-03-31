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
        position: 'right-top',
        offsetX: 8,
        itemValue: {
          style: {
            opacity: 0.65,
          },
          formatter: (text, item) => {
            return data.find((d) => d.type === item.value)?.value;
          },
        },
      },
    });

    plot.render();
  });
