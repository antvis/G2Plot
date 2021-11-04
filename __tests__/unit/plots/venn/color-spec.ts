import { Venn } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('venn: color', () => {
  const plot = new Venn(createDiv(), {
    data: [
      { sets: ['A'], size: 12, label: 'A' },
      { sets: ['B'], size: 12, label: 'B' },
      { sets: ['C'], size: 12, label: 'C' },
      { sets: ['A', 'B'], size: 2, label: 'A&B' },
      { sets: ['A', 'C'], size: 2, label: 'A&C' },
      { sets: ['B', 'C'], size: 2, label: 'B&C' },
    ],
    width: 400,
    height: 500,
    setsField: 'sets',
    sizeField: 'size',
    // default blendMode: 'multiply',
    legend: false,
  });
  plot.render();

  it('color: string', () => {
    plot.update({ color: 'red' });

    expect(plot.chart.geometries[0].elements[0].getModel().color).toBe('red');
    expect(plot.chart.geometries[0].elements[1].getModel().color).toBe('red');
    expect(plot.chart.geometries[0].elements[2].getModel().color).toBe('red');
    expect(plot.chart.geometries[0].elements[3].getModel().color).toBe('rgba(255, 0, 0, 1)'); // 交集元素
    expect(plot.chart.geometries[0].elements[4].getModel().color).toBe('rgba(255, 0, 0, 1)');
    expect(plot.chart.geometries[0].elements[5].getModel().color).toBe('rgba(255, 0, 0, 1)');
  });

  it('color: array', () => {
    plot.update({ color: ['red', 'blue', 'yellow'] });

    expect(plot.chart.geometries[0].elements[0].getModel().color).toBe('red');
    expect(plot.chart.geometries[0].elements[1].getModel().color).toBe('blue');
    expect(plot.chart.geometries[0].elements[2].getModel().color).toBe('yellow');
    expect(plot.chart.geometries[0].elements[3].getModel().color).toBe('rgba(0, 0, 0, 1)'); // 交集元素
    expect(plot.chart.geometries[0].elements[4].getModel().color).toBe('rgba(255, 0, 0, 1)');
    expect(plot.chart.geometries[0].elements[5].getModel().color).toBe('rgba(0, 0, 0, 1)');
  });

  it('color: callback', () => {
    plot.update({
      color: ({ size }) => {
        return size > 2 ? 'red' : 'blue';
      },
    });

    expect(plot.chart.geometries[0].elements[0].getModel().color).toBe('red');
    expect(plot.chart.geometries[0].elements[1].getModel().color).toBe('red');
    expect(plot.chart.geometries[0].elements[2].getModel().color).toBe('red');
    expect(plot.chart.geometries[0].elements[3].getModel().color).toBe('blue');
    expect(plot.chart.geometries[0].elements[4].getModel().color).toBe('blue');
    expect(plot.chart.geometries[0].elements[5].getModel().color).toBe('blue');
  });

  it('color: callback params', () => {
    plot.update({
      theme: { colors10: ['red', 'yellow', 'blue'] },
      color: undefined,
    });

    expect(plot.chart.geometries[0].elements[0].getModel().color).toBe('red');
    expect(plot.chart.geometries[0].elements[1].getModel().color).toBe('yellow');
    expect(plot.chart.geometries[0].elements[2].getModel().color).toBe('blue');
    expect(plot.chart.geometries[0].elements[4].getModel().color).not.toBe('black');

    plot.update({
      color: (datum, defaultColor) => {
        return ['red', 'blue'].indexOf(defaultColor) === -1 ? 'black' : defaultColor;
      },
    });
    expect(plot.chart.geometries[0].elements[0].getModel().color).toBe('red');
    expect(plot.chart.geometries[0].elements[1].getModel().color).not.toBe('yellow');
    expect(plot.chart.geometries[0].elements[1].getModel().color).toBe('black');
    expect(plot.chart.geometries[0].elements[2].getModel().color).toBe('blue');
    expect(plot.chart.geometries[0].elements[4].getModel().color).toBe('black');
  });

  afterAll(() => {
    plot.destroy();
  });
});
