import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
  .then((res) => res.json())
  .then((data) => {
    const line = new Line('container', {
      data,
      padding: 'auto',
      xField: 'Date',
      yField: 'scales',
      annotations: [
        // 低于中位数颜色变化
        {
          type: 'regionFilter',
          start: ['min', 'median'],
          end: ['max', '0'],
          color: '#F4664A',
        },
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
            stroke: '#F4664A',
            lineDash: [2, 2],
          },
        },
      ],
    });

    line.render();
  });
