import { Scatter } from '../../../../src';
import { data } from '../../../data/gender';
import { createDiv } from '../../../utils/dom';

describe('scatter', () => {
  it('size: number options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      sizeField: 'weight',
      size: [5, 10],
      xAxis: {
        nice: true,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;
    const sizeArr = [];
    elements.forEach((ele) => {
      sizeArr.push(ele.getModel().size);
    });
    sizeArr.sort((a, b) => a - b);

    expect(elements.length).toBe(507);
    expect(Math.floor(sizeArr[0])).toBe(5);
    expect(sizeArr[0]).not.toEqual(sizeArr[sizeArr.length - 1]);

    scatter.destroy();
  });

  it('size: number array options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      sizeField: 'gender',
      size: [5, 10],
      xAxis: {
        nice: true,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;

    // @ts-ignore
    expect(geometry.attributeOption.size.values.length).toBe(2);
    expect(elements.length).toBe(507);
    expect(elements[0].getModel().size).not.toBe(elements[elements.length - 1].getModel().size);

    scatter.destroy();
  });

  it('size: callback options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      size: ({ weight }) => {
        return Math.ceil(weight / 10);
      },
      xAxis: {
        nice: true,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;
    const sizeArr = [];
    elements.forEach((ele) => {
      sizeArr.push(ele.getModel().size);
    });
    sizeArr.sort((a, b) => a - b);

    // @ts-ignore
    expect(geometry.attributeOption.size.callback).toBeFunction();
    expect(elements.length).toBe(507);
    expect(sizeArr[0] > 0).toBeTruthy();
    expect(sizeArr[0]).not.toEqual(sizeArr[sizeArr.length - 1]);

    scatter.destroy();
  });

  it('size: default', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      sizeField: 'weight',
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;
    const sizeArr = [];
    elements.forEach((ele) => {
      sizeArr.push(ele.getModel().size);
    });
    sizeArr.sort((a, b) => a - b);

    // @ts-ignore
    expect(elements.length).toBe(507);
    expect(sizeArr[0]).toBe(4); // 默认值
    expect(sizeArr[sizeArr.length - 1]).toBe(4);

    scatter.destroy();
  });
  it('size: callback', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      data,
      xField: 'weight',
      yField: 'height',
      sizeField: 'weight',
      size: () => {
        return 20;
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;
    const sizeArr = elements.map((ele) => ele.getModel().size);
    expect(sizeArr[0]).toBe(20);
    expect(sizeArr[sizeArr.length - 1]).toBe(20);
    scatter.destroy();
  });
  it('size: number', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      data,
      xField: 'weight',
      yField: 'height',
      sizeField: 'weight',
      size: 1,
    });

    scatter.render();
    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].getModel().size).toBe(1);
    expect(elements[500].getModel().size).toBe(1);
    scatter.destroy();
  });
});
