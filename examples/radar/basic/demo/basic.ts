import { Radar } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/a104a693-2dd0-4a71-a190-39ec88f7307c.json')
  .then((data) => data.json())
  .then((data) => {
    const radarPlot = new Radar('container', {
      data,
      xField: 'item',
      yField: 'score',
      meta: {
        score: {
          alias: '分数',
        },
      },
      xAxis: {
        label: {
          offset: 15,
        },
      },
      yAxis: {
        grid: {
          alternateColor: ['rgba(0, 0, 0, 0.04)', null],
        },
      },
      point: {},
    });
    radarPlot.render();
  });
