import { Stock } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/9SiTLAwFYu/stock-data.json')
  .then((data) => data.json())
  .then((data) => {
    const plot = new Stock('container', {
      data,
      xField: 'date',
      yField: ['open', 'close', 'high', 'low'],
      slider: {
        start: 0.755,
        end: 0.76,
      },
    });

    plot.render();
  });
