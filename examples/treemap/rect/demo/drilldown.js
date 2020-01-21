import { Treemap } from '@antv/g2plot';
import { each, clone } from '@antv/util';

fetch('https://gw.alipayobjects.com/os/basement_prod/c2589761-62d6-411d-9d51-794d6860c4a9.json')
  .then((res) => res.json())
  .then((data) => {
    // 对数据进行预处理
    const rootData = { name: '公司销售数据', value: 0, children: [] };
    each(data, (s) => {
      const children = clone(s.children);
      const childrenArray = [];
      each(children, (c) => {
        if (c.children && c.children.length > 0) {
          childrenArray.push(c);
        }
      });
      s.children = childrenArray;
      rootData.value += s.value;
      rootData.children.push(s);
    });
    // 绘制图表
    const treemapPlot = new Treemap(document.getElementById('container'), {
      renderer: 'svg',
      data: rootData,
      colorField: 'name',
      interactions: [
        {
          type: 'drilldown',
          cfg: {
            startNode: {
              name: 'root',
            },
            mapping: {
              1: {
                field: 'name',
              },
              2: {
                field: 'name',
                values: ['#f5bc32', '#e66557', '#71c8ea', '#9362b7', '#fd984f', '#279493', '#fd9bc3'],
              },
              3: {
                field: 'value',
                values: (parent) => {
                  const parentColor = parent.shape.attr('fill');
                  return ['#ffffff', parentColor];
                },
              },
            },
          },
        },
      ],
    });
    treemapPlot.render();
  });
