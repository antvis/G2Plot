import { Column } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('column', () => {
  it('pattern: obj', () => {
    const column = new Column(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      pattern: {
        type: 'line',
      },
    });

    column.render();

    const geometry = column.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    column.update({
      pattern: {
        type: 'dot',
      },
    });

    expect(column.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(column.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(column.chart.geometries[0].elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    column.destroy();
  });

  it('pattern: function', () => {
    const column = new Column(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      pattern: ({ area }) => {
        if (area === '华北') {
          return { type: 'dot' };
        }
      },
    });

    column.render();

    const geometry = column.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[3].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    column.update({
      pattern: ({ area }) => {
        if (area === '中南') {
          return { type: 'line' };
        }
      },
    });

    expect(column.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(column.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    column.destroy();
  });
});
