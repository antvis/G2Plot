import { Scatter } from '@antv/g2plot';

fetch('../data/IMDB.json')
  .then((res) => res.json())
  .then((data) => {
    const scatterPlot = new Scatter(document.getElementById('container'), {
      data,
      xField: 'Revenue (Millions)',
      yField: 'Rating',
      xAxis: {
        visible: true,
        min: -5,
      },
    });
    scatterPlot.render();
  });
