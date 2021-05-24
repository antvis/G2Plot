import { Column } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/mor%26R5yBI9/stack-group-column.json')
  .then((data) => data.json())
  .then((data) => {
    const column = new Column('container', {
      data,
      xField: 'product_type',
      yField: 'order_amt',
      isGroup: true,
      isStack: true,
      seriesField: 'product_sub_type',
      groupField: 'sex',
      tooltip: {
        formatter: (datum) => ({
          name: `${datum.product_sub_type} ${datum.sex === '男' ? '👦' : '👧'}`,
          value: datum.order_amt,
        }),
      },
    });

    column.render();
  });
