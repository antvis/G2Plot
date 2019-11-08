import { Bar } from '@antv/g2plot';

fetch('../data/sales.json')
  .then((res) => res.json())
  .then((data) => {
    const barPlot = new Bar(document.getElementById('container'), {
      forceFit: true,
      title: {
        visible: true,
        text: '基础条形图 - 滚动条',
      },
      data,
      xField: '销售额',
      yField: '城市',
      xAxis: {
        visible: true,
        autoHideLabel: true,
      },
      yAxis: {
        visible: true,
        autoHideLabel: true,
      },
      label: {
        visible: false,
      },
      interactions: [
        {
          type: 'scrollbar',
          cfg: {
            type: 'vertical',
          },
        },
      ],
    });

    barPlot.render();
  });
