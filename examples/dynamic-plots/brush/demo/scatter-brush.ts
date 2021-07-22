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
        // 圈选高亮，不指定默认为: filter
        action: 'highlight',
        mask: {
          style: {
            fill: 'rgba(0,0,0,0.15)',
            stroke: 'rgba(0,0,0,0.45)',
            lineWidth: 0.5,
          },
        },
      },
    });
    plot.render();
  });
