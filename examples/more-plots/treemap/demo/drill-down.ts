import { Treemap } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/k5SYI%24mOo1/treemap.json')
  .then((res) => res.json())
  .then((rootData) => {
    const treemapPlot = new Treemap('container', {
      data: rootData,
      colorField: 'name',
      legend: {
        position: 'top-left',
      },
      tooltip: {
        formatter: (v) => {
          const root = v.path[v.path.length - 1];
          return {
            name: v.name,
            value: `${v.value}(总占比${((v.value / root.value) * 100).toFixed(2)}%)`,
          };
        },
      },
      // use `drilldown: { enabled: true }` to replace `interactions: [{ type: 'treemap-drill-down' }]`
      drilldown: {
        enabled: true,
        breadCrumb: {
          rootText: '初始',
        },
      },
      // 开启动画
      animation: {},
    });
    treemapPlot.render();
  });
