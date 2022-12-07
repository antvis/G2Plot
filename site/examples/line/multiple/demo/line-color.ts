import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
  .then((res) => res.json())
  .then((data) => {
    const line = new Line('container', {
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'category',
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      color: ['#1979C9', '#D62A0D', '#FAA219'],
    });

    line.render();
  });
