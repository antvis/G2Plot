import { Treemap } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { TREEMAP } from '../../../data/treemap';

describe('treemap sort', () => {
  it('treemap sort', () => {
    const treemapPlot = new Treemap(createDiv(), {
      data: TREEMAP,
      colorField: 'name',
    });

    treemapPlot.render();

    // 1. 图形经过排序
    // @ts-ignore
    expect(treemapPlot.chart.geometries[0].elements[0].getModel().data.name).toBe('分类 2');
    // @ts-ignore
    expect(treemapPlot.chart.geometries[0].elements[0].getModel().data.value).toBe(800);
    // @ts-ignore
    expect(treemapPlot.chart.geometries[0].elements[1].getModel().data.name).toBe('分类 1');
    // @ts-ignore
    expect(treemapPlot.chart.geometries[0].elements[1].getModel().data.value).toBe(500);

    // 2. reflect y
    // @ts-ignore
    expect(treemapPlot.chart.getCoordinate().isReflectY).toBe(true);

    treemapPlot.destroy();
  });
});
