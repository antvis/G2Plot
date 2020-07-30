import { Histogram } from '../../../../src';
import { histogramData } from '../../../data/histogram-data';
import { createDiv } from '../../../utils/dom';

describe('Histogram: style', () => {
  it('style', () => {
    const histogram = new Histogram(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: histogramData,
      binField: 'value',
      binWidth: 2,
      columnStyle: {
        stroke: 'black',
        lineWidth: 2,
      },
    });
    histogram.render();

    const geometry = histogram.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('stroke')).toBe('black');
    expect(elements[0].shape.attr('lineWidth')).toBe(2);
  });

  it('style callback', () => {
    const histogram = new Histogram(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: histogramData,
      binField: 'value',
      binWidth: 2,
      columnStyle: (x, y) => {
        return {
          stroke: 'black',
          lineWidth: 2,
        };
      },
    });

    histogram.render();

    const geometry = histogram.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('stroke')).toBe('black');
    expect(elements[0].shape.attr('lineWidth')).toBe(2);
  });
});
