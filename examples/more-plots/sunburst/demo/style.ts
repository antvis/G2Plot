import { Sunburst } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json')
  .then((res) => res.json())
  .then((data) => {
    const plot = new Sunburst('container', {
      data,
      innerRadius: 0.3,
      interactions: [{ type: 'element-active' }],
      hierarchyConfig: {
        field: 'sum',
      },
      sunburstStyle: (datum) => {
        return {
          // 节点层级不大于 10
          fillOpacity: 0.75 - datum.depth / 10,
          strokeOpacity: 1 - datum.depth / 10,
        };
      },
    });
    plot.render();
  });
