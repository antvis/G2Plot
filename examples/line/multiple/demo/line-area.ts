import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line('container', {
      data,
      xField: 'year',
      yField: 'gdp',
      seriesField: 'name',
      yAxis: {
        label: {
          formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
        },
      },
      legend: {
        position: 'top',
      },
      smooth: true,
      // 配置折线趋势填充
      area: {
        style: {
          fillOpacity: 0.15,
        },
      },
      animation: {
        appear: {
          animation: 'wave-in',
          duration: 3000,
        },
      },
    });

    linePlot.render();
  });
