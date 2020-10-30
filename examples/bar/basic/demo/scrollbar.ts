import { Bar } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json')
  .then((res) => res.json())
  .then((data) => {
    const column = new Bar('container', {
      data,
      yField: '城市',
      xField: '销售额',
      yAxis: {
        label: {
          autoRotate: false,
        },
      },
      scrollbar: {
        type: 'vertical',
      },
    });

    column.render();
  });
