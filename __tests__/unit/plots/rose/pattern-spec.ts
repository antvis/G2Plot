import { Rose } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('rose: pattern', () => {
  const rose = new Rose(createDiv(), {
    width: 400,
    height: 300,
    data: salesByArea,
    xField: 'area',
    yField: 'sales',
    meta: {
      sales: {
        nice: true,
        formatter: (v) => `${Math.floor(v / 10000)}万`,
      },
    },
  });

  rose.render();

  it('pattern: obj', () => {
    rose.update({
      pattern: {
        type: 'line',
      },
    });

    const geometry = rose.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    rose.update({
      pattern: null,
    });

    expect(rose.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
    expect(rose.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
    expect(rose.chart.geometries[0].elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
  });

  it('pattern: callback', () => {
    rose.update({
      pattern: ({ area }) => {
        if (area === '中南') {
          return { type: 'dot' };
        }
      },
    });

    expect(rose.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
    expect(rose.chart.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(rose.chart.geometries[0].elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
  });

  afterAll(() => {
    rose.destroy();
  });
});
