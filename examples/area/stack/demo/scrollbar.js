import { StackArea } from '@antv/g2plot';

fetch('../data/subsales.json')
  .then((res) => res.json())
  .then((data) => {
    const areaPlot = new StackArea(document.getElementById('container'), {
      padding: 'auto',
      data,
      xField: '城市',
      yField: '销售额',
      stackField: '细分',
      xAxis: {
        visible: true,
        autoHideLabel: true,
      },
      interactions: [
        {
          type: 'scrollbar',
        },
      ],
    });
    areaPlot.render();
  });
