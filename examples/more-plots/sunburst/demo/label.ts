import { Sunburst } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json')
  .then((res) => res.json())
  .then((data) => {
    const plot = new Sunburst('container', {
      data,
      innerRadius: 0.2,
      radius: 1,
      interactions: [{ type: 'element-active' }],
      hierarchyConfig: {
        field: 'sum',
      },
      label: {
        // label layout: limit label in shape, which means the labels out of shape will be hide
        layout: [{ type: 'limit-in-shape' }],
      },
    });
    plot.render();
  });
