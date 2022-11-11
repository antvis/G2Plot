import { Treemap } from '../../../../src';
import { TREEMAP } from '../../../data/treemap';
import { createDiv } from '../../../utils/dom';

describe('treemap legend', () => {
  let treemapPlot;

  const options = {
    data: TREEMAP,
    colorField: 'name',
  };

  beforeAll(() => {
    treemapPlot = new Treemap(createDiv(''), options);
    treemapPlot.render();
  });

  afterAll(() => {
    treemapPlot.destroy();
  });

  it('treemap legend default', () => {
    const legendComponent = treemapPlot.chart.getController('legend').getComponents()[0];

    expect(legendComponent.direction).toBe('bottom');
    expect(legendComponent.component.cfg.items.length).toBe(TREEMAP.children.length);
  });

  it('treemap legend custom', () => {
    treemapPlot.update({
      ...options,
      legend: {
        position: 'top',
      },
    });

    expect(treemapPlot.chart.getController('legend').getComponents()[0].direction).toBe('top');
  });

  it('treemap legend false', () => {
    treemapPlot.update({
      ...options,
      legend: false,
    });

    expect(treemapPlot.chart.getController('legend').getComponents().length).toBe(0);
  });
});
