import { Area } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
  .then((res) => res.json())
  .then((data) => {
    const plot = new Area('container', {
      data,
      padding: 'auto',
      xField: 'Date',
      yField: 'scales',
      meta: {
        Date: {
          range: [0.02, 0.98],
        },
      },
      yAxis: {
        grid: null,
      },
      smooth: true,
      annotations: [
        {
          type: 'line',
          /** 起始位置 */
          start: ['min', 'median'],
          /** 结束位置 */
          end: ['max', 'median'],
          text: {
            content: '中位线',
            position: 'right',
            offsetY: 18,
            style: {
              textAlign: 'right',
            },
          },
          style: {
            lineWidth: 0.5,
            lineDash: [4, 4],
          },
        },
      ],
    });

    plot.render();
  });
