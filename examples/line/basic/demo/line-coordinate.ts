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
        type: 'timeCat',
        tickCount: 5,
      },
    });
    // 让折线图整体反转，更多 api 请查看 https://g2.antv.vision/zh/docs/api/general/coordinate
    line.chart.coordinate('rect').reflect('y');

    line.render();
  });
