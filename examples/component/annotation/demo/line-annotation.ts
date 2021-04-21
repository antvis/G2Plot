import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
  .then((res) => res.json())
  .then((data) => {
    const maxValue = Math.max(...data.map((d) => d.scales));
    const averageValue = data.map((d) => d.scales).reduce((a, b) => a + b, 0) / data.length;
    const line = new Line('container', {
      data,
      padding: 'auto',
      xField: 'Date',
      yField: 'scales',
      xAxis: {
        tickCount: 5,
      },
      smooth: true,
      annotations: [
        {
          type: 'line',
          /** 起始位置 */
          start: ['min', maxValue],
          /** 结束位置 */
          end: ['max', maxValue],
          text: {
            content: '最大值',
            position: 'right',
            offsetY: 18,
            style: {
              textAlign: 'right',
            },
          },
          style: {
            lineDash: [4, 4],
          },
        },
        {
          type: 'line',
          /** 起始位置 */
          start: ['min', averageValue],
          /** 结束位置 */
          end: ['max', averageValue],
          text: {
            content: '平均值线',
            position: 'right',
            offsetY: -6,
            style: {
              textAlign: 'right',
              fill: 'lightblue',
            },
          },
          style: {
            lineDash: [4, 4],
            stroke: 'lightblue',
          },
        },
      ],
    });

    line.render();
  });
