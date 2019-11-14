import { Line } from '@antv/g2plot';

fetch('../data/11-11.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line('container', {
      title: {
        visible: true,
        text: '双十一历年成交额',
      },
      description: {
        visible: true,
        text: '将折线图上的每一个数据点显示出来，作为辅助阅读。',
      },
      forceFit: true,
      data,
      padding: 'auto',
      xField: 'year',
      yField: 'sale',
      point: {
        visible: true,
      },
      label: {
        visible: true,
        type: 'point',
      },
    });

    linePlot.render();
  });
