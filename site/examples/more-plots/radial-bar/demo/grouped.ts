import { RadialBar } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/8elHX%26irfq/stack-column-data.json')
  .then((data) => data.json())
  .then((data) => {
    const plot = new RadialBar('container', {
      data,
      xField: 'year',
      yField: 'value',
      colorField: 'type',
      isGroup: true,
      maxAngle: 270,
    });

    plot.render();
  });
