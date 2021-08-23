import { CirclePacking } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { DATA } from '../../../data/circle-packing';

describe('Circle-Packing', () => {
  const div = createDiv();
  it('pattern: obj', () => {
    const plot = new CirclePacking(div, {
      padding: 0,
      data: DATA,
      hierarchyConfig: {
        sort: (a, b) => b.depth - a.depth,
      },
      pattern: {
        type: 'line',
      },
    });
    plot.render();

    const geometry = plot.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    plot.update({
      pattern: null,
    });

    expect(plot.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    plot.destroy();
  });

  it('pattern: callback', () => {
    const plot = new CirclePacking(div, {
      padding: 0,
      data: DATA,
      hierarchyConfig: {
        sort: (a, b) => b.depth - a.depth,
      },
      pattern: ({ depth }) => {
        if (depth === 0) {
          return { type: 'line' };
        }
      },
    });
    plot.render();

    const geometry = plot.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    plot.update({
      pattern: ({ depth }) => {
        if (depth === 1) {
          return { type: 'square' };
        }
      },
    });

    expect(plot.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
    expect(plot.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    plot.destroy();
  });
});
