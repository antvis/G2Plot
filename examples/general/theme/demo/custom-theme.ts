import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/7079228b-26dc-4db1-b912-aa7a6c94a1f1.json')
  .then((res) => res.json())
  .then((data) => {
    const line = new Line('container', {
      data,
      padding: 'auto',
      appendPadding: [10, 10, 5, 10],
      xField: 'date',
      yField: 'value',
      xAxis: {
        tickCount: 5,
      },
      theme: {},
    });

    line.render();
  });
