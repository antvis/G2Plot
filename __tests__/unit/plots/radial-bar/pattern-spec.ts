import { RadialBar } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { antvStar } from '../../../data/antv-star';

const xField = 'name';
const yField = 'star';

describe('radial-bar pattern', () => {
  it('pattern: obj', () => {
    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data: antvStar,
      xField,
      yField,
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
      pattern: false,
    });

    expect(bar.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    bar.destroy();
  });

  it('pattern: callback', () => {
    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data: antvStar,
      xField,
      yField,
      pattern: (d) => {
        if (d.star > 7346) {
          return { type: 'dot' };
        }
      },
    });
    bar.render();

    const geometry = bar.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[7].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    bar.update({
      pattern: (d) => {
        if (d.star > 7100) {
          return { type: 'dot' };
        }
      },
    });

    expect(bar.chart.geometries[0].elements[7].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(bar.chart.geometries[0].elements[6].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
    expect(bar.chart.geometries[0].elements[5].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    bar.destroy();
  });
});
