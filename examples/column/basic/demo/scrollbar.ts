import { Column } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json')
  .then((res) => res.json())
  .then((data) => {
    const column = new Column('container', {
      data,
      xField: '城市',
      yField: '销售额',
      xAxis: {
        label: {
          autoRotate: false,
        },
      },
      scrollbar: {
        type: 'horizontal',
      },
    });

    column.render();
  });
