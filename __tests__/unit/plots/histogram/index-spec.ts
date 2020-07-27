import { Histogram } from '../../../../src';
import { histogramData } from '../../../data/histogram-data';
import { createDiv } from '../../../utils/dom';

describe('histogram', () => {
  it('binWidth', () => {
    const histogram = new Histogram(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: histogramData,
      binField: 'value',
      binWidth: 2,
    });

    histogram.render();

    const geometry = histogram.chart.geometries[0];
    const shapeOrigin = geometry.getShapes()[0].get('origin').data;
    expect(shapeOrigin.range[1] - shapeOrigin.range[0]).toBe(2);
  });

  it('binNumber', () => {
    const histogram = new Histogram(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: histogramData,
      binNumber: 4,
      binField: 'value',
    });

    histogram.render();

    const geometry = histogram.chart.geometries[0];
    const shapes = geometry.getShapes();

    expect(shapes.length - 1).toBe(4);
  });

  /**
   * 这个测试dataset处理方式有问题
   * issue已经提过去了 https://github.com/antvis/data-set/issues/90
   */
  it('automatic calculate binNumber', () => {
    const histogram = new Histogram(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: histogramData,
      binField: 'value',
    });

    histogram.render();

    const geometry = histogram.chart.geometries[0];
    const shapeOrigin = geometry.getShapes()[0].get('origin').data;

    /**
     * 结合dataset的写法是binWidth = histogramData（最大值-最小值）/ 默认值30
     * https://github.com/antvis/data-set/blob/master/src/transform/bin/histogram.ts#L45
     */
    const binWidth = (23.4 - 1.2) / 30;

    expect(shapeOrigin.range[1] - shapeOrigin.range[0]).toBe(binWidth);
  });

  it('color with binWidth', () => {
    const histogram = new Histogram(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: histogramData,
      binField: 'value',
      binWidth: 2,
      color: 'red',
    });

    histogram.render();

    const geometry = histogram.chart.geometries[0];
    const elements = geometry.elements;
    const shapeOrigin = geometry.getShapes()[0].get('origin').data;

    expect(shapeOrigin.range[1] - shapeOrigin.range[0]).toBe(2);
    expect(elements[0].getModel().color).toBe('red');
  });
});
