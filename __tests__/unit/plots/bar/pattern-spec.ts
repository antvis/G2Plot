import { Bar } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('bar style', () => {
  it('pattern: obj', () => {
    const bar = new Bar(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'sales',
      yField: 'area',
      pattern: {
        type: 'line',
      },
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    bar.update({
      pattern: {
        type: 'dot',
      },
    });

    expect(bar.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(bar.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(bar.chart.geometries[0].elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    bar.destroy();
  });

  it('pattern: callback', () => {
    const bar = new Bar(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'sales',
      yField: 'area',
      pattern: ({ area }) => {
        if (area === '华北') {
          return { type: 'dot' };
        }
      },
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    bar.update({
      pattern: ({ area }) => {
        if (area === '西南') {
          return { type: 'dot' };
        }
      },
    });

    expect(bar.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(bar.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    bar.destroy();
  });
});
