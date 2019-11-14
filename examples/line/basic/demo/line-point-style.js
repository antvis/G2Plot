import { Line } from '@antv/g2plot';

fetch('../data/11-11.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line(document.getElementById('container'), {
      title: {
        visible: true,
        text: '配置折线数据点样式',
      },
      padding: 'auto',
      forceFit: true,
      data,
      xField: 'year',
      yField: 'sale',
      label: {
        visible: true,
        type: 'point',
      },
      point: {
        visible: true,
        size: 5,
        shape: 'diamond',
        style: {
          fill: 'white',
          stroke: '#2593fc',
          lineWidth: 2,
        },
      },
    });

    linePlot.render();
  });
