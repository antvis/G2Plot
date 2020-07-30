import { Histogram } from '../../../../src';
import { histogramData } from '../../../data/histogram-data';
import { createDiv } from '../../../utils/dom';

describe('Histogram: axis', () => {
  it('xAxis', () => {
    const histogram = new Histogram(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: histogramData,
      binField: 'value',
      binWidth: 2,
      meta: {
        count: {
          min: 0,
          max: 20,
        },
      },
      xAxis: {
        label: {
          style: {
            fill: 'red',
          },
        },
      },
    });
    histogram.render();

    const geometry = histogram.chart.geometries[0];

    expect(geometry.scales.count.min).toBe(0);
    expect(geometry.scales.count.max).toBe(20);

    // @ts-ignore
    expect(histogram.chart.options.axes.range.label.style.fill).toBe('red');
  });

  it('yAxis', () => {
    const histogram = new Histogram(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: histogramData,
      binField: 'value',
      binWidth: 2,
      yAxis: {
        nice: true,
        label: {
          style: {
            fill: 'red',
          },
        },
      },
    });

    histogram.render();

    // @ts-ignore
    expect(histogram.chart.options.axes.count.nice).toBe(true);
    // @ts-ignore
    expect(histogram.chart.options.axes.count.label.style.fill).toBe('red');
  });
});
