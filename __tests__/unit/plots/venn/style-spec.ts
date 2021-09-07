import { Venn } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('venn: pointStyle', () => {
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
    legend: false,
    setsField: 'sets',
    sizeField: 'size',
  });
  plot.render();

  it('style: object', () => {
    plot.update({
      pointStyle: {
        fill: 'red',
        stroke: 'yellow',
        opacity: 0.8,
        lineWidth: 4,
        lineDash: [2, 2],
        fillOpacity: 0.5,
        strokeOpacity: 0.5,
      },
    });

    const elements = plot.chart.geometries[0].elements;
    expect(elements[0].getModel().style.fill).toBe('red');
    expect(elements[0].getModel().style.stroke).toBe('yellow');
    expect(elements[0].getModel().style.opacity).toBe(0.8);
    expect(elements[0].getModel().style.lineDash).toEqual([2, 2]);
    expect(elements[0].getModel().style.fillOpacity).toBe(0.5);
    expect(elements[0].getModel().style.strokeOpacity).toBe(0.5);
  });

  it('style: callback', () => {
    plot.update({
      pointStyle: ({ size }) => {
        if (size > 2) {
          return {
            fill: 'blue',
            stroke: 'yellow',
            opacity: 0.8,
          };
        }
        return {
          fill: 'red',
          stroke: 'green',
          opacity: 0.5,
        };
      },
    });

    const elements = plot.chart.geometries[0].elements;
    expect(elements[0].getModel().style.fill).toBe('blue');
    expect(elements[0].getModel().style.stroke).toBe('yellow');
    expect(elements[0].getModel().style.opacity).toBe(0.8);
    expect(elements[3].getModel().style.fill).toBe('red');
    expect(elements[3].getModel().style.stroke).toBe('green');
    expect(elements[3].getModel().style.opacity).toBe(0.5);
  });

  afterAll(() => {
    plot.destroy();
  });
});
