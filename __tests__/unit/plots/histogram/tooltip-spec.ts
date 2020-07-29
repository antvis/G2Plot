import { Histogram } from '../../../../src';
import { histogramData } from '../../../data/histogram-data';
import { createDiv } from '../../../utils/dom';

describe('Histogram:tooltip', () => {
  const histogram = new Histogram(createDiv(), {
    width: 400,
    height: 300,
    appendPadding: 10,
    data: histogramData,
    binField: 'value',
    binWidth: 2,
    tooltip: {
      title: 'hello wold!',
    },
  });

  histogram.render();

  it('tooltip', () => {
    // @ts-ignore
    expect(histogram.chart.options.tooltip.title).toBe('hello wold!');
  });
});
