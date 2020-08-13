import { Line } from '@antv/g2plot';
import { uniq, findIndex } from '@antv/util';

fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
  .then((res) => res.json())
  .then((data) => {
    const COLOR_PLATE_10 = [
      '#5B8FF9',
      '#5AD8A6',
      '#5D7092',
      '#F6BD16',
      '#E8684A',
      '#6DC8EC',
      '#9270CA',
      '#FF9D4D',
      '#269A99',
      '#FF99C3',
    ];

    const container = 'container';
    const containerBox = container.getBoundingClientRect();
    const series = uniq(data.map((d) => d.category));
    const markerSize = 6;

    const line = new Line(container, {
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
      legend: {
        position: 'right-top',
      },
      color: COLOR_PLATE_10,
      point: {
        shape: (x, y, category) => {
          return category === 'Gas fuel' ? 'square' : 'circle';
        },
        style: (x, y, category) => {
          return {
            r: Number(x) % 4 ? 0 : 3, // 4 个数据示一个点标记
          };
        },
      },
    });

    line.render();
  });
