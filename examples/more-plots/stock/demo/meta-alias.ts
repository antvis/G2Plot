import { Stock } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/qtQ9nYfYJe/stock-data.json')
  .then((data) => data.json())
  .then((data) => {
    const stockPlot = new Stock('container', {
      data,
      xField: 'trade_date',
      yField: ['open', 'close', 'high', 'low'],
      meta: {
        vol: { alias: '成交量' },
        open: { alias: '开盘价' },
        close: { alias: '收盘价' },
        high: { alias: '最高价' },
        low: { alias: '最低价' },
      },
    });

    stockPlot.render();
  });
