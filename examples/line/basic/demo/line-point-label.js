import { Line } from '@antv/g2plot';

fetch('../data/11-11.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line(document.getElementById('container'), {
      title: {
        visible: true,
        text: '折线图-数据点label',
      },
      description: {
        visible: true,
        text: '为折线上的每一个数据点添加图形标签。',
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
    });

    linePlot.render();
  });
