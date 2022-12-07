import { Column } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/PC3daFYjNw/column-data.json')
  .then((data) => data.json())
  .then((data) => {
    const plot = new Column('container', {
      data,
      xField: 'city',
      yField: 'value',
      seriesField: 'type',
      isGroup: 'true',
      legend: {
        position: 'right-top',
        offsetX: 8,
        title: {
          text: '产品类别 (平均销售量）',
          spacing: 8,
        },
        itemValue: {
          formatter: (text, item) => {
            const items = data.filter((d) => d.type === item.value);
            return items.length ? items.reduce((a, b) => a + b.value, 0) / items.length : '-';
          },
          style: {
            opacity: 0.65,
          },
        },
      },
    });

    plot.render();
  });
