import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/c48dbbb1-fccf-4a46-b68f-a3ddb4908b68.json')
  .then((res) => res.json())
  .then((data) => {
    const line = new Line('container', {
      data,
      xField: 'date',
      yField: 'value',
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      seriesField: 'type',
      color: ({ type }) => {
        return type === 'register' ? '#F4664A' : type === 'download' ? '#30BF78' : '#FAAD14';
      },
      lineStyle: ({ type }) => {
        if (type === 'register') {
          return {
            lineDash: [4, 4],
            opacity: 1,
          };
        }
        return {
          opacity: 0.5,
        };
      },
    });

    line.render();
  });
