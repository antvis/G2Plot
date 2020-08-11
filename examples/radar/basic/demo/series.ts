import { Radar } from '@antv/g2plot';

fetch('../data/series-radar.json')
  .then((data) => data.json())
  .then((data) => {
    const radarPlot = new Radar('container', {
      data,
      xField: 'item',
      yField: 'score',
      seriesField: 'user',
      xAxis: {
        label: {
          offset: 15,
        },
        grid: {
          line: {
            type: 'line',
          },
        },
      },
      tooltip: {
        shared: true,
      },
      point: {
        shape: 'circle',
      },
      // 开启面积
      area: {},
      legend: {
        visible: true,
        position: 'bottom-center',
      },
    });
    radarPlot.render();
  });
