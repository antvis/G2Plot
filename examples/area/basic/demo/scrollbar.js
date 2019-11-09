import { Area } from '@antv/g2plot';

fetch('../data/sales.json')
  .then((res) => res.json())
  .then((data) => {
    const areaPlot = new Area(document.getElementById('container'), {
      title: {
        visible: true,
        text: '基础面积图 - 滚动条',
      },
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
