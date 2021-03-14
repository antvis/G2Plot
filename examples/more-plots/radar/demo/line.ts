import { Radar } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/svFjSfJkYy/radar.json')
  .then((data) => data.json())
  .then((data) => {
    const radarPlot = new Radar('container', {
      data,
      xField: 'item',
      yField: 'score',
      seriesField: 'user',
      meta: {
        score: {
          alias: '分数',
          min: 0,
          max: 80,
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
      // 开启辅助点
      point: {
        size: 2,
      },
    });
    radarPlot.render();
  });
