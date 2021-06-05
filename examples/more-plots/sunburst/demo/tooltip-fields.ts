import { Sunburst } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/ryp44nvUYZ/coffee.json')
  .then((data) => data.json())
  .then((data) => {
    const plot = new Sunburst('container', {
      data,
      innerRadius: 0.3,
      interactions: [{ type: 'element-active' }],
      rawFields: ['symbol'],
      meta: {
        symbol: {
          alias: '国家',
        },
      },
      tooltip: {
        fields: ['path', 'symbol', 'value'],
        formatter: (datum) => ({
          name: datum.symbol ? `${datum.symbol} ${datum.path}` : datum.path,
          value: datum.value,
        }),
      },
    });
    plot.render();
  });
