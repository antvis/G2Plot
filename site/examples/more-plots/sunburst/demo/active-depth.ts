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
        // 配置展示的层级数
        activeDepth: 1,
      },
      drilldown: {
        breadCrumb: {
          rootText: '起始',
        },
      },
      label: {
        autoRotate: false,
      },
    });
    plot.render();
  });
