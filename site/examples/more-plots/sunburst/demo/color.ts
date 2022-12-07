import { Sunburst } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json')
  .then((res) => res.json())
  .then((data) => {
    const plot = new Sunburst('container', {
      data,
      innerRadius: 0.3,
      hierarchyConfig: {
        field: 'sum',
      },
      // 取色来自于：http://zhongguose.com/
      color: ['#f26b1f', '#fc8c23', '#f97d1c'],
      interactions: [{ type: 'element-active' }],
      state: {
        active: {
          style: {
            stroke: '#fff',
            lineWidth: 2,
          },
        },
      },
    });
    plot.render();
  });
