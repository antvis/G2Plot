import { Scatter } from '@antv/g2plot';

fetch('../data/IMDB.json')
  .then((res) => res.json())
  .then((data) => {
    const filterData = data.filter((item) => {
      return item['Revenue (Millions)'] !== null;
    });
    const scatterPlot = new Scatter(document.getElementById('container'), {
      data: filterData,
      xField: 'Revenue (Millions)',
      yField: 'Rating',
      xAxis: {
        visible: true,
        min: -5,
      },
    });
    scatterPlot.render();
  });
