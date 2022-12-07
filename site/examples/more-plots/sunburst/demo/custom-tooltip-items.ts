import { Sunburst } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/Ry8PJXni0S/sunburst.json')
  .then((res) => res.json())
  .then((data) => {
    const plot = new Sunburst('container', {
      data,
      innerRadius: 0.3,
      interactions: [{ type: 'element-active' }],
      hierarchyConfig: {
        field: 'sum',
      },
      tooltip: {
        customItems: (items) =>
          items.map((item) => {
            const path = item.data[Sunburst.SUNBURST_PATH_FIELD];
            return {
              ...item,
              name: path.length > 20 ? `${path.slice(0, 10)} ... ${path.slice(-10)}` : path,
              value: item.data.value,
            };
          }),
      },
    });
    plot.render();
  });
