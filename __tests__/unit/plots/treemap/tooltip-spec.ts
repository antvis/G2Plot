import { Treemap } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { TREEMAP } from '../../../data/treemap';
import { TREEMAP_CHILDREN } from '../../../data/treemap-nest';

describe('treemap tooltip', () => {
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

  it('treemap tooltip default', () => {
    const tooltipOption = treemapPlot.chart.options.tooltip;
    expect(tooltipOption.showMarkers).toBe(false);
    expect(tooltipOption.showTitle).toBe(false);
    expect(tooltipOption.fields).toEqual(['name', 'value', 'name']);
    expect(tooltipOption.formatter(TREEMAP.children[0])).toEqual({ name: '分类 1', value: 560 });
  });

  it('treemap tooltip custom', () => {
    treemapPlot.update({
      data: TREEMAP_CHILDREN,
      colorField: 'brand',
      tooltip: {
        showTitle: true,
        title: 'test',
      },
    });

    const customTooltipOption = treemapPlot.chart.options.tooltip;

    expect(customTooltipOption.showTitle).toBe(true);
    expect(customTooltipOption.title).toBe('test');
  });

  it('treemap tooltip false', () => {
    treemapPlot.update({
      tooltip: false,
    });

    expect(treemapPlot.chart.options.tooltip).toBe(false);
    expect(treemapPlot.chart.getComponents().find((co) => co.type === 'tooltip')).toBe(undefined);
  });
});
