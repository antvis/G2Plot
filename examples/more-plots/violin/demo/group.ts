import { Violin } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/6b0a5f1d-5931-42ae-b3ba-3c3cb77d0861.json')
  .then((response) => response.json())
  .then((data) => {
    const violinPlot = new Violin('container', {
      height: 500,
      data: data,
      xField: 'x',
      yField: 'y',
      seriesField: 'species',
    });
    violinPlot.render();
  });
