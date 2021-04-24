import { Column } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json')
  .then((res) => res.json())
  .then((data) => {
    const column = new Column('container', {
      data,
      xField: '品类',
      yField: '商品销售额增速',
      xAxis: {
        label: {
          autoRotate: false,
        },
      },
      slider: {
        start: 0.1,
        end: 0.2,
      },
    });

    column.render();
  });
