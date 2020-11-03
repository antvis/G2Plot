import { Histogram } from '../../../../src';
import { histogramData, histogramStackData } from '../../../data/histogram-data';
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

    const elements = geometry.elements;
    expect(elements[0].shape.attr('stroke')).toBe('#FFFFFF');
    expect(histogram.chart.getController('legend').visible).toEqual(true);
    // @ts-ignore
    expect(histogram.chart.getController('legend').components.length).toEqual(0);
    // @ts-ignore
    expect(histogram.chart.options.axes.count).toEqual({
      nice: true,
      label: {
        autoHide: true,
        autoRotate: false,
      },
    });
    // @ts-ignore
    expect(histogram.chart.options.axes.range).toEqual({
      nice: true,
      label: {
        autoHide: true,
        autoRotate: true,
      },
    });
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

    // 最大值 - 最小值
    const width = 23.4 - 1.2;
    const binNumber = Math.ceil(Math.log(histogramData.length) / Math.LN2) + 1;
    const binWidth = width / binNumber;

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
      color: () => 'red',
    });

    histogram.render();

    const geometry = histogram.chart.geometries[0];
    const elements = geometry.elements;
    const shapeOrigin = geometry.getShapes()[0].get('origin').data;

    expect(shapeOrigin.range[1] - shapeOrigin.range[0]).toBe(2);
    expect(elements[0].getModel().color).toBe('red');
  });

  it('stackField: 层叠直方图', () => {
    const histogram = new Histogram(createDiv('legend * true * stackField'), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: histogramStackData,
      binField: 'value',
      binWidth: 4,
      legend: true,
      stackField: 'type',
    });

    histogram.render();

    const geometry = histogram.chart.geometries[0];

    // 如果没有 stackField 是没有adjustNames这个数组
    expect(geometry.getAdjust('stack')).toMatchObject({
      xField: 'range',
      yField: 'count',
    });
    //@ts-ignore
    expect(histogram.chart.getController('legend').components[0].extra.scale.field).toEqual('type');
    //@ts-ignore
    expect(histogram.chart.getController('legend').components.length).toEqual(1);
  });

  it('stackField with color', () => {
    const colors = ['red', 'blue'];
    const histogram = new Histogram(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: histogramStackData,
      binField: 'value',
      binWidth: 4,
      stackField: 'type',
      color: colors,
    });

    histogram.render();

    const geometry = histogram.chart.geometries[0];
    const colorAttribute = geometry.getAttribute('color');

    expect(colorAttribute.values).toEqual(colors);
    expect(geometry.getAdjust('stack')).toMatchObject({
      xField: 'range',
      yField: 'count',
    });
  });
});
