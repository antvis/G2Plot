import { Area } from '../../../../src';
import { percentData } from '../../../data/area';
import { createDiv } from '../../../utils/dom';

describe('area', () => {
  it('pattern: obj', () => {
    const area = new Area(createDiv(), {
      data: percentData,
      width: 400,
      height: 300,
      xField: 'year',
      yField: 'value',
      seriesField: 'country',
      pattern: {
        type: 'line',
      },
    });

    area.render();

    const geometry = area.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    area.update({
      pattern: {
        type: 'dot',
      },
    });

    expect(area.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(area.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(area.chart.geometries[0].elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    area.destroy();
  });

  it('pattern: function', () => {
    const area = new Area(createDiv(), {
      data: percentData,
      width: 400,
      height: 300,
      xField: 'year',
      yField: 'value',
      seriesField: 'country',
      pattern: ({ country }) => {
        if (country === 'Asia') {
          return {
            type: 'line',
          };
        }
      },
    });
    area.render();

    const geometry = area.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    area.update({
      pattern: ({ country }) => {
        if (country === 'Africa') {
          return {
            type: 'line',
          };
        }
      },
    });
    expect(area.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(area.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    area.destroy();
  });
});
