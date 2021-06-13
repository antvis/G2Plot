import { Sunburst } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/%24ixDFx9%248M/coffee-data.json')
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
      hierarchyConfig: {
        // the weight of parent node depends on itself
        ignoreParentValue: false,
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
