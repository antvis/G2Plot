import { Column } from '@antv/g2plot';

const calcAverageValue = (data, type) => {
  const items = data.filter((d) => d.type === type);
  return items.length ? items.reduce((a, b) => a + b.value, 0) / items.length : '-';
};

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
        itemName: {
          style: (item, index) => {
            return {
              fill: calcAverageValue(data, item.value) > 10000 ? 'red' : 'green',
            };
          },
        },
        itemValue: {
          formatter: (text, item) => {
            return calcAverageValue(data, item.value);
          },
          style: (item, index) => {
            return {
              fill: calcAverageValue(data, item.value) > 10000 ? 'red' : 'green',
            };
          },
        },
      },
    });

    plot.render();
  });
