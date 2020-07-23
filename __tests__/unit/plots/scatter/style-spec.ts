import { Scatter } from '../../../../src';
import { data } from '../../../data/gender';
import { createDiv } from '../../../utils/dom';

describe('scatter', () => {
  it('style: object options', () => {
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
      pointStyle: {
        fill: 'red',
        stroke: 'yellow',
        opacity: 0.8,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;

    expect(elements[0].shape.attr('fill')).toBe('red');
    expect(elements[0].shape.attr('stroke')).toBe('yellow');
    expect(elements[0].shape.attr('opacity')).toBe(0.8);
  });

  it('style: callback options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      sizeField: 'weight',
      size: [5, 10],
      colorField: 'gender',
      xAxis: {
        nice: true,
      },
      pointStyle: (x: number, y: number, colorField: string) => {
        if (colorField === 'male') {
          return {
            fill: 'green',
            stroke: 'yellow',
            opacity: 0.8,
          };
        }
        return {
          fill: 'red',
          stroke: 'yellow',
          opacity: 0.8,
        };
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;
    const colorArr = [];
    elements.forEach((ele) => {
      colorArr.push(ele.shape.attr('fill'));
    });

    expect(colorArr).toContain('red');
    expect(colorArr).toContain('green');
    expect(elements[0].shape.attr('stroke')).toBe('yellow');
    expect(elements[0].shape.attr('opacity')).toBe(0.8);
  });
});
