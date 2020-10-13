import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
  .then((res) => res.json())
  .then((data) => {
    const line = new Line('container', {
      data,
      padding: 'auto',
      xField: 'Date',
      yField: 'scales',
      xAxis: {
        tickCount: 5,
      },
      slider: {
        start: 0.1,
        end: 0.5,
      },
    });

    line.render();
  });
