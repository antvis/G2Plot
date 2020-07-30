import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/%24KjfUOgRYa/GDP.json')
  .then((res) => res.json())
  .then((data) => {
    const line = new Line(document.getElementById('container'), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'year',
      yField: 'gdp',
      seriesField: 'name',
    });

    line.render();
  });
