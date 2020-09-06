import { Area } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
  .then((res) => res.json())
  .then((data) => {
    const area = new Area('container', {
      data,
      xField: 'Date',
      yField: 'scales',
      xAxis: {
        tickCount: 5,
      },
      annotations: [
        {
          type: 'text',
          position: ['median', 'median'],
          content: '趋势面积图',
          style: {
            textAlign: 'center',
          },
        },
      ],
    });
    area.render();
  });
