import { Scatter } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json')
  .then((res) => res.json())
  .then((data) => {
    const plot = new Scatter('container', {
      data,
      xField: 'weight',
      yField: 'height',
      colorField: 'gender',
      size: 5,
      shape: 'circle',
      pointStyle: {
        fillOpacity: 1,
      },
      brush: {
        enabled: true,
        // 圈选类型，默认: 'rect', 也可以设置 'y-rect', 'circle', 'path'
        type: 'x-rect',
        mask: {
          style: {
            fill: 'rgba(255,0,0,0.15)',
          },
        },
      },
    });
    plot.render();
  });
