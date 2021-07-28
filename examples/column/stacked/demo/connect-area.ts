import { Column } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/8elHX%26irfq/stack-column-data.json')
  .then((data) => data.json())
  .then((data) => {
    const stackedColumnPlot = new Column('container', {
      data,
      isStack: true,
      xField: 'year',
      yField: 'value',
      seriesField: 'type',
      label: {
        // 可手动配置 label 数据标签位置
        position: 'middle', // 'top', 'bottom', 'middle'
      },
      interactions: [{ type: 'active-region', enable: false }],
      connectedArea: {
        style: (oldStyle, element) => {
          return { fill: 'rgba(0,0,0,0.25)', stroke: oldStyle.fill, lineWidth: 0.5 };
        },
      },
    });

    stackedColumnPlot.render();
  });
