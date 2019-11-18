import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/fertility.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line(document.getElementById('container'), {
      title: {
        visible: true,
        text: '配置坐标轴tick数量',
      },
      forceFit: true,
      data,
      padding: 'auto',
      xField: 'year',
      yField: 'value',
      seriesField: 'country',
      xAxis: {
        type: 'dateTime',
        tickCount: 5,
      },
    });

    linePlot.render();
  });
