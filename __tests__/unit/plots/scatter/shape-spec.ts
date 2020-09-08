import { Scatter } from '../../../../src';
import { data } from '../../../data/gender';
import { createDiv } from '../../../utils/dom';

describe('scatter', () => {
  it('shpae: string options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      shapeField: 'gender',
      shape: 'hollow-diamond',
      xAxis: {
        nice: true,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;

    expect(elements.length).toBe(507);
    expect(elements[0].getModel().shape).toBe('hollow-diamond');
    expect(elements[elements.length - 1].getModel().shape).toBe('hollow-diamond');
  });

  it('shape: string array options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      shapeField: 'gender',
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
    expect(elements.length).toBe(507);
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
      shapeField: 'gender',
      size: 10,
      shape: (...args) => {
        if (args[args.length - 1] === 'female') {
          return 'square';
        }
        return 'circle';
      },
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

    // @ts-ignore
    expect(geometry.attributeOption.shape.callback).toBeFunction();
    expect(elements.length).toBe(507);
    expect(shapeArr).toContain('circle');
    expect(shapeArr).toContain('square');
  });
});
