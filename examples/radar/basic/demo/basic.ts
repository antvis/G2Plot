import { Radar } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/5c41aa9b-9c8a-425f-9f4d-934b889bb75d.json')
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
      yAxis: {
        grid: {
          line: {
            type: 'circle',
          },
        },
      },
      point: {
        shape: 'circle',
      },
      // 开启面积
      area: {},
      legend: {
        position: 'bottom',
      },
    });
    radarPlot.render();
  });
