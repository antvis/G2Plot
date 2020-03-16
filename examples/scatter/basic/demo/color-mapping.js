import { Scatter } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/basement_prod/7a78a36d-c97c-459d-9090-9e664cd17167.json')
  .then((res) => res.json())
  .then((data) => {
    const scatterPlot = new Scatter(document.getElementById('container'), {
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
