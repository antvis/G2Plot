import { Heatmap } from '../../../../src';
import { semanticBasicHeatmapData } from '../../../data/basic-heatmap';
import { createDiv } from '../../../utils/dom';

describe('heatmap', () => {
  it('x*y*color and style', () => {
    const heatmap = new Heatmap(createDiv('style'), {
      width: 400,
      height: 300,
      data: semanticBasicHeatmapData,
      xField: 'name',
      yField: 'day',
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
