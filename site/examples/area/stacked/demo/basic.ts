import { Area } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/b21e7336-0b3e-486c-9070-612ede49284e.json')
  .then((res) => res.json())
  .then((data) => {
    const area = new Area('container', {
      data,
      xField: 'date',
      yField: 'value',
      seriesField: 'country',
    });
    area.render();
  });
