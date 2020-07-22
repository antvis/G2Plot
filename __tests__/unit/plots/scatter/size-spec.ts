import { Scatter } from '../../../../src';
import { data } from '../../../data/gender';
import { createDiv } from '../../../utils/dom';

describe('scatter', () => {
  it('size: string options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      pointSize: 'weight',
      xAxis: {
        nice: true,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;

    expect(elements.length).not.toBe(0);
    expect(elements[0].getModel().size).not.toBe(0);
    expect(elements[0].getModel().size).not.toBe(elements[elements.length - 1].getModel().size);
  });

  it('size: number options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      pointSize: 5,
      xAxis: {
        nice: true,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;

    expect(elements.length).not.toBe(0);
    expect(elements[0].getModel().size).toBe(5);
    expect(elements[0].getModel().size).toBe(elements[elements.length - 1].getModel().size);
  });

  it('size: number array options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      pointSize: [5, 10],
      xAxis: {
        nice: true,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;

    // @ts-ignore
    expect(geometry.attributeOption.size.values.length).toBe(2);
    expect(elements.length).not.toBe(0);
    expect(elements[0].getModel().size).not.toBe(elements[elements.length - 1].getModel().size);
  });

  it('size: callback options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      pointSize: () => {
        return 6;
      },
      xAxis: {
        nice: true,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;

    // @ts-ignore
    expect(geometry.attributeOption.size.callback).toBeFunction();
    expect(elements.length).not.toBe(0);
    expect(elements[0].getModel().size).toBe(6);
  });
});
