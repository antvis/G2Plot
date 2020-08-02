import { Heatmap } from '../../../../src';
import { basicHeatmapData } from '../../../data/basic-heatmap';
import { createDiv } from '../../../utils/dom';

describe('heatmap', () => {
  const NAMES = ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura'];
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  it('x*y*color and style', () => {
    const heatmap = new Heatmap(createDiv('style'), {
      width: 400,
      height: 300,
      data: basicHeatmapData,
      xField: 'name',
      yField: 'day',
      meta: {
        name: {
          type: 'cat',
          values: NAMES,
        },
        day: {
          type: 'cat',
          values: DAYS,
        },
      },
      colorField: 'sales',
      heatmapStyle: {
        lineWidth: 1,
        stroke: '#ff0000',
      },
    });

    heatmap.render();

    const geometry = heatmap.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('lineWidth')).toBe(1);
    expect(elements[0].shape.attr('stroke')).toBe('#ff0000');

    heatmap.update({
      ...heatmap.options,
      heatmapStyle: () => {
        return { stroke: '#00ff00' };
      },
    });
    expect(heatmap.chart.geometries[0].elements[0].shape.attr('stroke')).toBe('#00ff00');
  });
});
