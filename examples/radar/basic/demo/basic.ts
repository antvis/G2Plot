import { Radar } from '@antv/g2plot';

fetch('../data/radar.json')
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
