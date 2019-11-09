import { Area } from '@antv/g2plot';

fetch('../data/sales.json')
  .then((res) => res.json())
  .then((data) => {
    const areaPlot = new Area(document.getElementById('container'), {
      padding: 'auto',
      forceFit: true,
      data,
      xField: '城市',
      xAxis: {
        visible: true,
        autoHideLabel: true,
      },
      yField: '销售额',
      interactions: [
        {
          type: 'scrollbar',
          cfg: {},
        },
      ],
    });
    areaPlot.render();
  });
