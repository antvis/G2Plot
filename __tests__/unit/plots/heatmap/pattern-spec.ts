import { Heatmap } from '../../../../src';
import { semanticBasicHeatmapData } from '../../../data/basic-heatmap';
import { createDiv } from '../../../utils/dom';

describe('heatmap: pattern', () => {
  it('pattern: obj', () => {
    const heatmap = new Heatmap(createDiv('style'), {
      width: 400,
      height: 300,
      data: semanticBasicHeatmapData,
      xField: 'name',
      yField: 'day',
      colorField: 'sales',
      pattern: {
        type: 'line',
      },
    });

    heatmap.render();

    const geometry = heatmap.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    heatmap.update({
      pattern: null,
    });

    expect(heatmap.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    heatmap.destroy();
  });

  it('pattern: callback', () => {
    const heatmap = new Heatmap(createDiv('style'), {
      width: 400,
      height: 300,
      data: semanticBasicHeatmapData,
      xField: 'name',
      yField: 'day',
      colorField: 'sales',
      pattern: ({ sales }) => {
        if (sales === 10) {
          return { type: 'dot' };
        }
      },
    });

    heatmap.render();

    const geometry = heatmap.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    heatmap.update({
      pattern: ({ sales }) => {
        if (sales === 19) {
          return { type: 'dot' };
        }
      },
    });

    expect(heatmap.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    heatmap.destroy();
  });
});
