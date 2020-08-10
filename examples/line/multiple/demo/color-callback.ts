import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/c48dbbb1-fccf-4a46-b68f-a3ddb4908b68.json')
  .then((res) => res.json())
  .then((data) => {
    const line = new Line(document.getElementById('container'), {
      data,
      xField: 'date',
      yField: 'value',
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      legend: {
        position: 'right-top',
      },
      seriesField: 'type',
      color: (type) => {
        return type === 'register' ? '#93D072' : '#2D71E7';
      },
    });

    line.render();
  });
