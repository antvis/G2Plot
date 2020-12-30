import { Treemap } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { TREEMAP } from '../../../data/treemap';

describe('treemap axis', () => {
  it('treemap axis', () => {
    const treemapPlot = new Treemap(createDiv(), {
      data: TREEMAP,
      colorField: 'name',
    });

    treemapPlot.render();

    // @ts-ignore
    expect(treemapPlot.chart.getController('axis').option).toBeFalsy();

    treemapPlot.destroy();
  });
});
