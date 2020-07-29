import { Histogram } from '../../../../src';
import { histogramData } from '../../../data/histogram-data';
import { createDiv } from '../../../utils/dom';

describe('Histogram - G2内置interaction', () => {
  const histogram = new Histogram(createDiv(), {
    width: 400,
    height: 300,
    appendPadding: 10,
    data: histogramData,
    binField: 'value',
    binWidth: 2,
  });

  histogram.render();

  it('交互: active-region', () => {
    histogram.update({
      ...histogram.options,
      interaction: 'active-region',
    });

    expect(histogram.chart.interactions['active-region']).toBeDefined();
  });

  it('交互: element-highlight', () => {
    histogram.update({
      ...histogram.options,
      interaction: 'element-highlight',
    });

    expect(histogram.chart.interactions['element-highlight']).toBeDefined();
  });

  it('交互: element-active', () => {
    histogram.update({
      ...histogram.options,
      interaction: 'element-active',
    });

    expect(histogram.chart.interactions['element-active']).toBeDefined();
  });
});
