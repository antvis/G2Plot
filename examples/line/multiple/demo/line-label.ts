import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line('container', {
      data,
      xField: 'year',
      yField: 'gdp',
      seriesField: 'name',
      appendPadding: [0, 50, 0, 0],
      yAxis: {
        label: {
          formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
        },
      },
      legend: {
        position: 'top',
      },
      smooth: true,
      animation: {
        appear: {
          animation: 'path-in-with-label',
          duration: 5000,
        },
      },
    });

    linePlot.render();
  });
