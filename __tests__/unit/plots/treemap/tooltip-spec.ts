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
    treemapPlot = new Treemap(createDiv('treemap', undefined, 'treemap-tooltip'), options);
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
    expect(tooltipOption.formatter(TREEMAP.children[0])).toEqual({ name: '分类 1', value: 500 });
  });

  it('treemap tooltip custom', () => {
    treemapPlot.update({
      data: TREEMAP_CHILDREN,
      colorField: 'brand',
      tooltip: {
        showTitle: true,
        title: 'test',
        fields: ['name', 'value', 'ext', 'parent'],
        formatter: (data) => {
          const ratio = (data.value / data.parent.value).toFixed(2);
          return {
            name: data.name,
            value: `${data.value}/${data.ext || '-'}/${ratio}`,
          };
        },
      },
    });

    const customTooltipOption = treemapPlot.chart.options.tooltip;

    expect(customTooltipOption.showTitle).toBe(true);
    expect(customTooltipOption.title).toBe('test');
    expect(customTooltipOption.fields).toEqual(['name', 'value', 'ext', 'parent']);

    const testElement = treemapPlot.chart.geometries[0].elements.find((ele) => ele.data.name === '其他');
    const bbox = testElement.getBBox();
    treemapPlot.chart.showTooltip({ x: (bbox.maxX + bbox.minX) / 2, y: (bbox.maxY + bbox.minY) / 2 });
    expect(document.querySelectorAll('#treemap-tooltip .g2-tooltip-list-item .g2-tooltip-name')[0].innerHTML).toBe(
      '其他'
    );
    expect(document.querySelectorAll('#treemap-tooltip .g2-tooltip-list-item .g2-tooltip-value')[0].innerHTML).toBe(
      `${testElement.data.value}/${testElement.data.ext || '-'}/${(
        testElement.data.value / testElement.data.parent.value
      ).toFixed(2)}`
    );
  });

  it('treemap tooltip false', () => {
    treemapPlot.update({
      tooltip: false,
    });

    expect(treemapPlot.chart.options.tooltip).toBe(false);
    expect(treemapPlot.chart.getComponents().find((co) => co.type === 'tooltip')).toBe(undefined);
  });
});
