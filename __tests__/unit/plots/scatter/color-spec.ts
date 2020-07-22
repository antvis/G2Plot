import { Scatter } from '../../../../src';
import { data } from '../../../data/gender';
import { createDiv } from '../../../utils/dom';

describe('scatter', () => {
  it('color: string options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      color: 'red',
      xAxis: {
        nice: true,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];

    const elements = geometry.elements;

    expect(elements.length).not.toBe(0);

    expect(elements[0].getModel().color).toBe('red');
  });

  it('color: string array options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      color: ['#e764ff', '#2b0033'],
      xAxis: {
        nice: true,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];

    // @ts-ignore
    expect(geometry.attributeOption.color.values.length).toBe(2);

    const elements = geometry.elements;

    expect(elements.length).not.toBe(0);

    expect(elements[0].getModel().color).not.toBe('red');
  });
});
