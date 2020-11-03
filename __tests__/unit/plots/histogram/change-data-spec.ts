import { Histogram } from '../../../../src';
import { histogramData } from '../../../data/histogram-data';
import { createDiv } from '../../../utils/dom';

describe('Histogram: change data', () => {
  const histogram = new Histogram(createDiv(), {
    width: 400,
    height: 300,
    appendPadding: 10,
    data: [],
    binField: 'value',
    binWidth: 2,
    tooltip: {
      title: 'hello wold!',
    },
  });

  histogram.render();

  it('change data', () => {
    // @ts-ignore
    expect(histogram.chart.options.tooltip.title).toBe('hello wold!');
    histogram.changeData(histogramData);
    expect(histogram.chart.getData().length).toBe(12);
  });
});
