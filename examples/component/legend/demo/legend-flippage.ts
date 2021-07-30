import { Column } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/P14mCvkybz/large-datra.json')
  .then((data) => data.json())
  .then((data) => {
    const plot = new Column('container', {
      data,
      xField: 'product_box',
      yField: 'value',
      seriesField: 'province',
      isGroup: 'true',
      legend: {
        flipPage: true,
        maxRow: 2,
      },
    });

    plot.render();
  });
