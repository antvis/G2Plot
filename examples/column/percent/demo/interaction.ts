import { Column, G2 } from '@antv/g2plot';

G2.registerInteraction('element-link', {
  start: [{ trigger: 'interval:mouseenter', action: 'element-link-by-color:link' }],
  end: [{ trigger: 'interval:mouseleave', action: 'element-link-by-color:unlink' }],
});

fetch('https://gw.alipayobjects.com/os/antfincdn/jSRiL%26YNql/percent-column.json')
  .then((data) => data.json())
  .then((data) => {
    const columnPlot = new Column('container', {
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'type',
      isPercent: true,
      isStack: true,
      meta: {
        value: {
          min: 0,
          max: 1,
        },
      },
      label: {
        position: 'middle',
        content: (item) => {
          return `${(item.value * 100).toFixed(2)}%`;
        },
        style: {
          fill: '#fff',
        },
      },
      tooltip: false,
      interactions: [{ type: 'element-highlight-by-color' }, { type: 'element-link' }],
    });

    columnPlot.render();
  });
