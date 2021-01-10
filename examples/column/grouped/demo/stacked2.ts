import { Column } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/cK%24sTxSsah/stack-group-column.json')
  .then((data) => data.json())
  .then((data) => {
    const column = new Column('container', {
      data,
      xField: 'month',
      yField: 'value',
      isGroup: true,
      isStack: true,
      seriesField: 'type',
      groupField: 'name',
    });

    column.render();
  });
