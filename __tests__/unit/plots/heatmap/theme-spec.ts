import { Heatmap } from '../../../../src';
import { semanticBasicHeatmapData } from '../../../data/basic-heatmap';
import { createDiv } from '../../../utils/dom';

describe('heatmap', () => {
  it('theme', () => {
    const sequenceColors = ['#FF0000', '#00FF00', '#0000FF'];
    const heatmap = new Heatmap(createDiv('basic heatmap'), {
      width: 400,
      height: 300,
      data: semanticBasicHeatmapData,
      xField: 'name',
      yField: 'day',
      colorField: 'sales',
      theme: {
        sequenceColors,
      },
    });

    heatmap.render();

    // @ts-ignore
    expect(heatmap.getDefaultOptions()).toBe(Heatmap.getDefaultOptions());

    const geometry = heatmap.chart.geometries[0];

    const { elements } = geometry;

    let maxElementIndex = 0;
    let minElementIndex = 0;

    elements.forEach((e, i) => {
      const value = e.getData().sales;
      if (elements[maxElementIndex].getData().sales < value) {
        maxElementIndex = i;
      }
      if (elements[minElementIndex].getData().sales > value) {
        minElementIndex = i;
      }
    });

    expect(elements[maxElementIndex].getModel().color.toUpperCase()).toBe(sequenceColors[sequenceColors.length - 1]);
    expect(elements[minElementIndex].getModel().color.toUpperCase()).toBe(sequenceColors[0]);

    heatmap.destroy();
  });
});
