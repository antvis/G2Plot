import { Treemap } from '../../src';
import { mobile } from '../data/mobile';
import { each, clone } from '@antv/util';

describe('treemap', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '400px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);
  const data = processData(mobile);
  it('initilize', () => {
    const treemapPlot = new Treemap(canvasDiv, {
      width: 600,
      height: 400,
      data,
      colorField: 'brand',
      maxLevel: 1,
      tooltip: {
        visible: true,
      },
    });
    treemapPlot.render();
  });

  it.skip('interaction', () => {
    const data = test;
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
    const treemapPlot = new Treemap(canvasDiv, {
      data: rootData,
      colorField: 'name',
      tooltip: {
        visible: true,
      },
      interactions: [
        {
          type: 'drilldown',
          cfg: {
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
                  return ['#ffffff', parent.color];
                },
              },
            },
          },
        },
      ],
    });
    treemapPlot.render();
  });
});

function processData(data) {
  let sumValue = 0;
  each(data, (d) => {
    sumValue += d.value;
  });

  return { name: 'root', value: sumValue, children: data };
}
