import { Stock } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/qtQ9nYfYJe/stock-data.json')
  .then((data) => data.json())
  .then((data) => {
    const stockPlot = new Stock('container', {
      data,
      xField: 'trade_date',
      yField: ['open', 'close', 'high', 'low'],
      tooltip: {
        // 关闭 tooltip 悬浮内容
        showContent: false,
      },
      stockStyle: {
        stroke: '#666',
        lineWidth: 0.5,
      },
    });

    stockPlot.render();
  });
