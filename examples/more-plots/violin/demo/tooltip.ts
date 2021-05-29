import { Violin } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/6b0a5f1d-5931-42ae-b3ba-3c3cb77d0861.json')
  .then((response) => response.json())
  .then((data) => {
    const violinPlot = new Violin('container', {
      width: 400,
      height: 500,
      data: data,
      xField: 'x',
      yField: 'y',
      seriesField: 'species',
      meta: {
        high: {
          alias: '最大值',
          formatter: (v) => `${v.toFixed(2)} %`,
        },
        low: {
          alias: '最小值',
          formatter: (v) => `${v.toFixed(2)} %`,
        },
        q1: {
          alias: '上四分位数',
          formatter: (v) => `${v.toFixed(2)} %`,
        },
        q3: {
          alias: '下四分位数',
          formatter: (v) => `${v.toFixed(2)} %`,
        },
        species: {
          alias: '品类',
        },
      },
      tooltip: {
        fields: ['species', 'high', 'q1', 'q3', 'low'],
      },
    });
    violinPlot.render();
  });
