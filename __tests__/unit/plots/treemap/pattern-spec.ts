import { Treemap } from '../../../../src';
import { TREEMAP } from '../../../data/treemap';
import { createDiv } from '../../../utils/dom';

const color = [
  '#5B8FF9',
  '#CDDDFD',
  '#5AD8A6',
  '#CDF3E4',
  '#5D7092',
  '#CED4DE',
  '#F6BD16',
  '#FCEBB9',
  '#6F5EF9',
  '#D3CEFD',
  '#6DC8EC',
  '#D3EEF9',
  '#945FB9',
  '#DECFEA',
  '#FF9845',
  '#FFE0C7',
  '#1E9493',
  '#BBDEDE',
  '#FF99C3',
  '#FFE0ED',
];

describe('treemap: pattern', () => {
  it('pattern: obj', () => {
    const treemapPlot = new Treemap(createDiv(), {
      data: TREEMAP,
      colorField: 'name',
      color,
      pattern: {
        type: 'line',
      },
    });

    treemapPlot.render();

    const geometry = treemapPlot.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    treemapPlot.update({
      pattern: {
        type: 'dot',
      },
    });

    expect(treemapPlot.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(treemapPlot.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(treemapPlot.chart.geometries[0].elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    treemapPlot.destroy();
  });

  it('pattern: callback', () => {
    const treemapPlot = new Treemap(createDiv(), {
      data: TREEMAP,
      colorField: 'name',
      color,
      pattern: ({ value }) => {
        if (value > 600) {
          return { type: 'line' };
        }
      },
    });

    treemapPlot.render();

    const geometry = treemapPlot.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    treemapPlot.update({
      pattern: ({ value }) => {
        if (value > 400) {
          return { type: 'line' };
        }
      },
    });

    expect(treemapPlot.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(treemapPlot.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(treemapPlot.chart.geometries[0].elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    treemapPlot.destroy();
  });
});
