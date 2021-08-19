import { Rose } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/XcLAPaQeeP/rose-data.json')
  .then((data) => data.json())
  .then((data) => {
    // 分组玫瑰图
    const rosePlot = new Rose('container', {
      data,
      xField: 'type',
      yField: 'value',
      isGroup: true,
      // 当 isGroup 为 true 时，该值为必填
      seriesField: 'user',
      radius: 0.9,
      label: {
        offset: -15,
      },
      pattern: {
        type: 'dot',
      },
      interactions: [
        {
          type: 'element-active',
        },
      ],
    });

    rosePlot.render();
  });
