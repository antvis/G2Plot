import { Scatter } from '../../../../src';
import { data } from '../../../data/gender';
import { createDiv } from '../../../utils/dom';

describe('scatter', () => {
  it('axis: axis options', () => {
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
        label: {
          formatter: (text: string, item: any, index: number) => {
            return text;
          },
          style: {
            fill: 'green',
            fontSize: 16,
          },
        },
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];

    const elements = geometry.elements;

    expect(elements.length).not.toBe(0);

    // @ts-ignore
    expect(scatter.chart.options.axes.weight.label.style.fill).toBe('green');
    // @ts-ignore
    expect(scatter.chart.options.axes.weight.label.style.fontSize).toBe(16);
  });
});
