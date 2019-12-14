import { Scatter } from '@antv/g2plot';

fetch('../data/IMDB.json')
  .then((res) => res.json())
  .then((data) => {
    const scatterPlot = new Scatter(document.getElementById('container'), {
      title: {
        visible: true,
        text: '散点图颜色映射',
      },
      data,
      xField: 'Revenue (Millions)',
      yField: 'Rating',
      colorField: 'Genre',
      color: ['#d62728', '#2ca02c', '#000000', '#9467bd', '#ffd500', '#1f77b4', '#00518a', '#ffbc69', '#9bd646'],
      pointStyle: {
        fillOpacity: 1,
      },
      xAxis: {
        visible: true,
        min: -5,
      },
    });
    scatterPlot.render();
  });
