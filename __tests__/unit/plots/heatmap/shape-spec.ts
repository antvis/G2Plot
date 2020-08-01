import { Heatmap } from '../../../../src';
import { basicHeatmapData } from '../../../data/basic-heatmap';
import { createDiv } from '../../../utils/dom';

describe('heatmap', () => {
  it('x*y*color and shape', () => {
    const NAMES = ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura'];
    const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const heatmap = new Heatmap(createDiv('label'), {
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
      shape: 'circle',
      label: {
        offset: -2,
        style: {
          fill: '#fff',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      },
    });

    heatmap.render();

    expect(heatmap.chart.geometries[0].attributes.shape.values).toEqual(['circle']);
  });
});
