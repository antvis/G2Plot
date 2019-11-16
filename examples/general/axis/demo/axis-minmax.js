import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/fertility.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line(document.getElementById('container'), {
      title: {
        visible: true,
        text: '配置坐标轴最大值和最小值',
      },
      description: {
        visible: true,
      },
      forceFit: true,
      data,
      padding: 'auto',
      xField: 'year',
      yField: 'value',
      seriesField: 'country',
      smooth: true,
      xAxis: {
        visible: true,
        type: 'dateTime',
        tickCount: 5,
      },
      yAxis: {
        visible: true,
        min: 3,
        max: 7,
      },
    });

    linePlot.render();
  });
