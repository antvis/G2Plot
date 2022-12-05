import { Stock } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/ZWgtj7pC%261/stock.json')
  .then((data) => data.json())
  .then((data) => {
    const stockPlot = new Stock('container', {
      appendPadding: [0, 10, 0, 0],
      data,
      xField: 'trade_date',
      yField: ['open', 'close', 'high', 'low'],
      slider: {},
    });

    stockPlot.render();
  });
