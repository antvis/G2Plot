import { Area } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
  .then((res) => res.json())
  .then((data) => {
    const area = new Area('container', {
      data,
      xField: 'Date',
      yField: 'scales',
      annotations: [
        {
          type: 'text',
          position: ['min', 'median'],
          content: '中位数',
          offsetY: -4,
          style: {
            textBaseline: 'bottom',
          },
        },
        {
          type: 'line',
          start: ['min', 'median'],
          end: ['max', 'median'],
          style: {
            stroke: 'red',
            lineDash: [2, 2],
          },
        },
      ],
    });
    area.render();
  });
