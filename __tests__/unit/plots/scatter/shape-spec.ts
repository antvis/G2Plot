import { Scatter } from '../../../../src';
import { data } from '../../../data/gender';
import { createDiv } from '../../../utils/dom';

describe('scatter', () => {
  it('shape: string options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      shape: 'weight',
      xAxis: {
        nice: true,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;

    expect(elements.length).not.toBe(0);

    const shapeArr = [];
    elements.forEach((ele) => {
      shapeArr.push(ele.getModel().shape);
    });
    const set = new Set(shapeArr);

    expect(shapeArr).toContain('circle');
    expect(set.size > 2).toBeTruthy();
  });

  it('shpae: number options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      shape: 'hollow-diamond',
      xAxis: {
        nice: true,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;

    expect(elements.length).not.toBe(0);
    expect(elements[0].getModel().shape).toBe('hollow-diamond');
    expect(elements[elements.length - 1].getModel().shape).toBe('hollow-diamond');
  });

  it('shape: number array options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      shape: ['circle', 'square'],
      xAxis: {
        nice: true,
      },
    });

    scatter.render();
    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;
    const shapeArr = [];
    elements.forEach((ele) => {
      shapeArr.push(ele.getModel().shape);
    });
    const set = new Set(shapeArr);

    // @ts-ignore
    expect(geometry.attributeOption.shape.values.length).toBe(2);
    expect(elements.length).not.toBe(0);
    expect(set.size).toBe(2);
  });

  it('shape: callback options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      shape: () => {
        return 'circle';
      },
      xAxis: {
        nice: true,
      },
    });

    scatter.render();
    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;

    // @ts-ignore
    expect(geometry.attributeOption.shape.callback).toBeFunction();
    expect(elements.length).not.toBe(0);
    expect(elements[0].getModel().shape).toBe('circle');
  });
});
