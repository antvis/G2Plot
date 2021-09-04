import { Venn } from '../../../../src';
import { LEGEND_SPACE } from '../../../../src/plots/venn/adaptor';
import { createDiv } from '../../../utils/dom';

describe('venn padding', () => {
  const plot = new Venn(createDiv(), {
    width: 400,
    height: 500,
    data: [
      { sets: ['A'], size: 12, label: 'A' },
      { sets: ['B'], size: 12, label: 'B' },
      { sets: ['C'], size: 12, label: 'C' },
      { sets: ['A', 'B'], size: 2, label: 'A&B' },
      { sets: ['A', 'C'], size: 2, label: 'A&C' },
      { sets: ['B', 'C'], size: 2, label: 'B&C' },
      { sets: ['A', 'B', 'C'], size: 300 },
    ],
  });
  plot.render();

  it('default', () => {
    expect(plot.chart.appendPadding).toEqual([40, 0, 0, 0]);
    plot.chart.geometries[0].elements.forEach((element) => {
      // 所有元素的都进行了偏移 [1, 0, 0, 0, 1, 0, 0, 40, 1]
      expect(element.shape.attr('matrix')[7]).toBe(LEGEND_SPACE);
    });

    plot.update({ legend: { position: 'left' } });
    plot.chart.geometries[0].elements.forEach((element) => {
      // 所有元素的都进行了偏移 [1, 0, 0, 0, 1, 0, 40, 0, 1]
      expect(element.shape.attr('matrix')[6]).toBe(LEGEND_SPACE);
    });

    plot.update({ legend: false, appendPadding: [10, 10, 10, 10] });
    plot.chart.geometries[0].elements.forEach((element) => {
      // 所有元素的都进行了偏移 [1, 0, 0, 0, 1, 0, 40, 0, 1]
      expect(element.shape.attr('matrix')[6]).toBe(10);
      expect(element.shape.attr('matrix')[6]).toBe(10);
    });
  });

  it('changesize', () => {
    const y = (plot.chart.geometries[0].elements[0].getData() as any).y;
    plot.changeSize(800, 500);
    // @ts-ignore
    plot.triggerResize();
    const y1 = (plot.chart.geometries[0].elements[0].getData() as any).y;
    expect(y1).toBeCloseTo(y, 1);
  });

  afterAll(() => {
    plot.destroy();
  });
});
