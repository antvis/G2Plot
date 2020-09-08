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
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null,
            },
          },
        },
      },
      yAxis: {
        line: null,
        tickLine: null,
        grid: {
          line: {
            type: 'line',
            style: {
              lineDash: null,
            },
          },
        },
      },
      point: {},
    });
    radarPlot.render();
  });
