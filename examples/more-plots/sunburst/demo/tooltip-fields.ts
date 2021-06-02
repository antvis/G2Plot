import { Sunburst } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json')
  .then((res) => res.json())
  .then((data) => {
    const plot = new Sunburst('container', {
      // 旭日图升级
      version: 2,
      data,
      innerRadius: 0.3,
      interactions: [{ type: 'element-active' }],
      hierarchyConfig: {
        field: 'sum',
      },
      tooltip: {
        fields: ['name', 'value'],
      },
    });
    plot.render();
  });
