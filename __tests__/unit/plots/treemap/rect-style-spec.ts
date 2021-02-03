import { Treemap } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { TREEMAP } from '../../../data/treemap';

describe('treemap rectStyle', () => {
  it('rectStyle', () => {
    // 默认值
    const treemapPlot = new Treemap(createDiv(), {
      data: TREEMAP,
      colorField: 'name',
    });

    treemapPlot.render();

    const geometry = treemapPlot.chart.geometries[0];

    // @ts-ignore
    expect(geometry.styleOption.cfg).toEqual({ lineWidth: 1, stroke: '#fff' });

    // 设置 rectStyle 对象
    treemapPlot.update({
      rectStyle: {
        fill: '#f00',
        lineWidth: 5,
      },
    });

    // @ts-ignore
    expect(treemapPlot.chart.geometries[0].styleOption.cfg).toEqual({ lineWidth: 5, fill: '#f00', stroke: '#fff' });

    // 设置 rectStyle 回调函数
    treemapPlot.update({
      rectStyle: (data) => {
        if (data.value > 100) {
          return {
            fill: '#f00',
            stroke: '#fff',
          };
        }
        return {
          fill: '#0f0',
          stroke: '#fff',
        };
      },
    });

    // @ts-ignore
    expect(treemapPlot.chart.geometries[0].elements[0].model.style).toEqual({ fill: '#f00', stroke: '#fff' });
    // @ts-ignore
    expect(treemapPlot.chart.geometries[0].elements[10].model.style).toEqual({ fill: '#0f0', stroke: '#fff' });

    treemapPlot.destroy();
  });
});
