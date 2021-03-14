import { MultiView, G2 } from '@antv/g2plot';

G2.registerInteraction('custom-association-filter', {
  showEnable: [
    { trigger: 'element:mouseenter', action: 'cursor:pointer' },
    { trigger: 'element:mouseleave', action: 'cursor:default' },
  ],
  start: [
    {
      trigger: 'element:click',
      action: (context) => {
        const { view, event } = context;
        // 获取第二个 view
        const view1 = view.parent.views[1];
        view1.filter('area', (d) => d === event.data?.data.area);
        view1.render(true);
      },
    },
  ],
  end: [
    {
      trigger: 'element:dblclick',
      action: (context) => {
        const { view } = context;
        // 获取第二个 view
        const view1 = view.parent.views[1];
        view1.filter('area', null);
        view1.render(true);
      },
    },
  ],
});

fetch('https://gw.alipayobjects.com/os/antfincdn/HkxWvFrZuC/association-data.json')
  .then((data) => data.json())
  .then((data) => {
    const plot = new MultiView('container', {
      // 关闭 chart 上的 tooltip，子 view 开启 tooltip
      tooltip: false,
      plots: [
        {
          type: 'pie',
          region: { start: { x: 0, y: 0 }, end: { x: 1, y: 0.45 } },
          options: {
            data: data.pie,
            angleField: 'bill',
            colorField: 'area',
            tooltip: {
              showMarkers: false,
            },
            radius: 0.85,
            label: { type: 'inner', formatter: '{name}', offset: '-15%' },
            interactions: [{ type: 'element-highlight' }, { type: 'custom-association-filter' }],
          },
        },
        {
          type: 'area',
          region: { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.95 } },
          options: {
            data: data.line,
            xField: 'time',
            yField: 'value',
            seriesField: 'area',
            line: {},
            point: { style: { r: 2.5 } },
            meta: {
              time: { range: [0, 1] },
            },
            smooth: true,
            tooltip: {
              showCrosshairs: true,
              shared: true,
            },
          },
        },
      ],
    });

    plot.render();
  });
