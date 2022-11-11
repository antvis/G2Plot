import { Treemap } from '../../../../src';
import { TREEMAP } from '../../../data/treemap';
import { createDiv } from '../../../utils/dom';

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
