import { Line } from '@antv/g2plot';

fetch('../data/fireworks-sales.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line(document.getElementById('container'), {
      title: {
        visible: true,
        text: '单折线图的基础用法',
      },
      description: {
        visible: true,
        text: '最基础简单的折线图使用方式，显示一个指标的趋势',
      },
      forceFit: true,
      data,
      padding: 'auto',
      xField: 'Date',
      yField: 'scales',
      xAxis: {
        type: 'dateTime',
        tickCount: 5,
      },
    });

    linePlot.render();
  });
