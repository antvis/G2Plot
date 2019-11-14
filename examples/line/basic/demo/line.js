import { Line } from '@antv/g2plot';

fetch('../data/11-11.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line('container', {
      title: {
        visible: true,
        text: '双十一历年成交额',
      },
      forceFit: true,
      data,
      padding: 'auto',
      xField: 'year',
      yField: 'sale',
      yAxis: {
        title: {
          visible: true,
          text: '双十一历年成交额(亿)',
        },
      },
    });

    linePlot.render();
  });
