import { Area } from '@antv/g2plot';

fetch('../data/sales.json')
  .then((res) => res.json())
  .then((data) => {
    const areaPlot = new Area(document.getElementById('container'), {
      title: {
        visible: true,
        text: '基础面积图 - 缩略轴',
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
          type: 'slider',
          cfg: {
            start: 0.5,
            end: 0.55,
          },
        },
      ],
    });
    areaPlot.render();
  });
