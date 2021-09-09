import { Venn } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('venn: blendMode', () => {
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
    color: ['red', 'lime', 'blue'],
    legend: false,
  });
  plot.render();

  it('blendMode: default multiply', () => {
    plot.update({ blendMode: 'multiply' });

    expect(plot.chart.geometries[0].elements[0].getModel().color).toBe('red');
    expect(plot.chart.geometries[0].elements[1].getModel().color).toBe('lime');
    expect(plot.chart.geometries[0].elements[2].getModel().color).toBe('blue');
    expect(plot.chart.geometries[0].elements[3].getModel().color).toBe('rgba(0, 0, 0, 1)'); // 交集元素
    expect(plot.chart.geometries[0].elements[4].getModel().color).toBe('rgba(0, 0, 0, 1)');
    expect(plot.chart.geometries[0].elements[5].getModel().color).toBe('rgba(0, 0, 0, 1)');
  });

  it('blendMode: normal', () => {
    plot.update({ blendMode: 'normal' });

    expect(plot.chart.geometries[0].elements[0].getModel().color).toBe('red');
    expect(plot.chart.geometries[0].elements[1].getModel().color).toBe('lime');
    expect(plot.chart.geometries[0].elements[2].getModel().color).toBe('blue');
    expect(plot.chart.geometries[0].elements[3].getModel().color).toBe('rgba(255, 0, 0, 1)'); // 交集元素
    expect(plot.chart.geometries[0].elements[4].getModel().color).toBe('rgba(255, 0, 0, 1)');
    expect(plot.chart.geometries[0].elements[5].getModel().color).toBe('rgba(0, 255, 0, 1)');
  });

  it('blendMode: darken', () => {
    plot.update({ blendMode: 'darken' });

    expect(plot.chart.geometries[0].elements[0].getModel().color).toBe('red');
    expect(plot.chart.geometries[0].elements[1].getModel().color).toBe('lime');
    expect(plot.chart.geometries[0].elements[2].getModel().color).toBe('blue');
    expect(plot.chart.geometries[0].elements[3].getModel().color).toBe('rgba(0, 0, 0, 1)'); // 交集元素
    expect(plot.chart.geometries[0].elements[4].getModel().color).toBe('rgba(0, 0, 0, 1)');
    expect(plot.chart.geometries[0].elements[5].getModel().color).toBe('rgba(0, 0, 0, 1)');
  });

  it('blendMode: lighten', () => {
    plot.update({ blendMode: 'lighten' });

    expect(plot.chart.geometries[0].elements[0].getModel().color).toBe('red');
    expect(plot.chart.geometries[0].elements[1].getModel().color).toBe('lime');
    expect(plot.chart.geometries[0].elements[2].getModel().color).toBe('blue');
    expect(plot.chart.geometries[0].elements[3].getModel().color).toBe('rgba(255, 255, 0, 1)'); // 交集元素
    expect(plot.chart.geometries[0].elements[4].getModel().color).toBe('rgba(255, 0, 255, 1)');
    expect(plot.chart.geometries[0].elements[5].getModel().color).toBe('rgba(0, 255, 255, 1)');
  });

  it('blendMode: screen', () => {
    plot.update({ blendMode: 'screen' });

    expect(plot.chart.geometries[0].elements[0].getModel().color).toBe('red');
    expect(plot.chart.geometries[0].elements[1].getModel().color).toBe('lime');
    expect(plot.chart.geometries[0].elements[2].getModel().color).toBe('blue');
    expect(plot.chart.geometries[0].elements[3].getModel().color).toBe('rgba(255, 255, 0, 1)'); // 交集元素
    expect(plot.chart.geometries[0].elements[4].getModel().color).toBe('rgba(255, 0, 255, 1)');
    expect(plot.chart.geometries[0].elements[5].getModel().color).toBe('rgba(0, 255, 255, 1)');
  });

  it('blendMode: overlay', () => {
    plot.update({ blendMode: 'overlay' });

    expect(plot.chart.geometries[0].elements[0].getModel().color).toBe('red');
    expect(plot.chart.geometries[0].elements[1].getModel().color).toBe('lime');
    expect(plot.chart.geometries[0].elements[2].getModel().color).toBe('blue');
    expect(plot.chart.geometries[0].elements[3].getModel().color).toBe('rgba(0, 255, 0, 1)'); // 交集元素
    expect(plot.chart.geometries[0].elements[4].getModel().color).toBe('rgba(0, 0, 255, 1)');
    expect(plot.chart.geometries[0].elements[5].getModel().color).toBe('rgba(0, 0, 255, 1)');
  });

  it('blendMode: burn', () => {
    plot.update({ blendMode: 'burn' });

    expect(plot.chart.geometries[0].elements[0].getModel().color).toBe('red');
    expect(plot.chart.geometries[0].elements[1].getModel().color).toBe('lime');
    expect(plot.chart.geometries[0].elements[2].getModel().color).toBe('blue');
    expect(plot.chart.geometries[0].elements[3].getModel().color).toBe('rgba(0, 255, 0, 1)'); // 交集元素
    expect(plot.chart.geometries[0].elements[4].getModel().color).toBe('rgba(0, 0, 255, 1)');
    expect(plot.chart.geometries[0].elements[5].getModel().color).toBe('rgba(0, 0, 255, 1)');
  });

  it('blendMode: dodge', () => {
    plot.update({ blendMode: 'dodge' });

    expect(plot.chart.geometries[0].elements[0].getModel().color).toBe('red');
    expect(plot.chart.geometries[0].elements[1].getModel().color).toBe('lime');
    expect(plot.chart.geometries[0].elements[2].getModel().color).toBe('blue');
    expect(plot.chart.geometries[0].elements[3].getModel().color).toBe('rgba(255, 255, 0, 1)'); // 交集元素
    expect(plot.chart.geometries[0].elements[4].getModel().color).toBe('rgba(255, 0, 255, 1)');
    expect(plot.chart.geometries[0].elements[5].getModel().color).toBe('rgba(0, 255, 255, 1)');
  });

  afterAll(() => {
    plot.destroy();
  });
});
