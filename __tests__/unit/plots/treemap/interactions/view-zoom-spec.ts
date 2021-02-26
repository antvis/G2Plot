import { Treemap } from '../../../../../src';
import { createDiv } from '../../../../utils/dom';
import { delay } from '../../../../utils/delay';
import { TREEMAP } from '../../../../data/treemap';

describe('treemap view zoom interaction', () => {
  it('basic treemap', async () => {
    const treemapPlot = new Treemap(createDiv(), {
      data: TREEMAP,
      colorField: 'name',
    });

    treemapPlot.render();

    // 默认不开启
    expect(treemapPlot.chart.getCanvas().getEvents().mousewheel).toBeUndefined();

    // 开启
    treemapPlot.update({
      interactions: [{ type: 'view-zoom' }, { type: 'drag-move' }],
    });

    const mousewheelEvent = treemapPlot.chart.getCanvas().getEvents().mousewheel;

    expect(Array.isArray(mousewheelEvent)).toBeTruthy();
    expect(mousewheelEvent.length).toBe(1);

    // 关闭
    treemapPlot.update({
      interactions: [{ type: 'view-zoom', enable: false }],
    });

    expect(treemapPlot.chart.getCanvas().getEvents().mousewheel).toBeUndefined();

    treemapPlot.destroy();
  });
});
