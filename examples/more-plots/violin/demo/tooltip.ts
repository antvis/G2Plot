import { Violin } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/6b0a5f1d-5931-42ae-b3ba-3c3cb77d0861.json')
  .then((response) => response.json())
  .then((data) => {
    const violinPlot = new Violin('container', {
      height: 500,
      data: data,
      xField: 'x',
      yField: 'y',
      box: {
        textMap: {
          max: '最大值',
          min: '最小值',
          q3: '上四分位',
          q1: '下四分位',
          median: '中位数',
        },
      },
      tooltip: {
        formatter: (datum) => {
          return {
            value: {
              max: datum.minMax[0] + '%',
              min: datum.minMax[1] + '%',
              q1: datum.quantile[0] + '%',
              q3: datum.quantile[1] + '%',
              median: datum.median[0] + '%',
            },
          };
        },
      },
    });
    violinPlot.render();
  });
