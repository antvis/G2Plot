import { Sunburst } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { SIMPLE_SUNBURST_DATA } from '../../../data/sunburst';

describe('sunburst: pattern', () => {
  const div = createDiv();
  const plot = new Sunburst(div, {
    data: SIMPLE_SUNBURST_DATA,
  });
  plot.render();

  it('pattern: obj', () => {
    plot.update({
      pattern: {
        type: 'line',
      },
    });

    const geometry = plot.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    plot.update({
      pattern: null,
    });

    expect(plot.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
    expect(plot.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
    expect(plot.chart.geometries[0].elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
  });

  it('pattern: callback', () => {
    plot.update({
      pattern: ({ name }) => {
        if (name === '中南美洲') {
          return { type: 'line' };
        }
      },
    });

    expect(plot.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(plot.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
  });

  afterAll(() => {
    plot.destroy();
  });
});
