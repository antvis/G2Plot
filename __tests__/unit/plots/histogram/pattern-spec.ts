import { Histogram } from '../../../../src';
import { histogramData } from '../../../data/histogram-data';
import { createDiv } from '../../../utils/dom';

describe('Histogram: pattern', () => {
  it('pattern: obj', () => {
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
      pattern: {
        type: 'line',
      },
    });
    histogram.render();

    const geometry = histogram.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    histogram.update({
      pattern: {
        type: 'dot',
      },
    });

    expect(histogram.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(histogram.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(histogram.chart.geometries[0].elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    histogram.destroy();
  });

  it('pattern: callback', () => {
    const histogram = new Histogram(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: histogramData,
      binField: 'value',
      binWidth: 2,
      pattern: (d) => {
        if (d.count > 7) {
          return { type: 'dot' };
        }
      },
    });

    histogram.render();

    const geometry = histogram.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[3].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
    expect(elements[4].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[5].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[6].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    histogram.update({
      pattern: (d) => {
        if (d.count > 9) {
          return { type: 'dot' };
        }
      },
    });

    expect(histogram.chart.geometries[0].elements[4].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
    expect(histogram.chart.geometries[0].elements[5].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(histogram.chart.geometries[0].elements[6].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    histogram.destroy();
  });
});
