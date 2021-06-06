import { Treemap } from '@antv/g2plot';
import { each, clone } from '@antv/util';

fetch('https://gw.alipayobjects.com/os/basement_prod/c2589761-62d6-411d-9d51-794d6860c4a9.json')
  .then((res) => res.json())
  .then((fetchData) => {
    const rootData = { name: '公司销售数据', children: [] };
    each(fetchData, (s) => {
      const children = clone(s.children);
      const childrenArray = [];
      each(children, (c) => {
        if (c.children && c.children.length > 0) {
          childrenArray.push(c);
        }
      });
      s.children = childrenArray;
      rootData.children.push(s);
    });

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
