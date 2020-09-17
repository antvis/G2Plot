import { Area } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
  .then((res) => res.json())
  .then((data) => {
    const area = new Area('container', {
      data,
      xField: 'Date',
      yField: 'scales',
      xAxis: {
        type: 'dateTime',
        tickCount: 5,
      },
      slider: {
        start: 0.1,
        end: 0.9,
        trendCfg: {
          isArea: true,
        },
      },
    });
    area.render();
  });
