import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/fertility.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line(document.getElementById('container'), {
      title: {
        visible: true,
        text: '配置坐标轴标题',
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
        title: {
          text: 'x轴标题',
        },
      },
      yAxis: {
        visible: true,
        title: {
          text: 'y轴标题',
        },
      },
    });

    linePlot.render();
  });
