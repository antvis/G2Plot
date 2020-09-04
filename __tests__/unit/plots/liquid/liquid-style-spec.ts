import { Liquid } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('liquid', () => {
  it('liquidStyle', () => {
    const liquid = new Liquid(createDiv(), {
      width: 600,
      height: 300,
      percent: 0.25,
      liquidStyle: (v: number) => {
        return {
          fill: v > 0.75 ? 'red' : 'green',
        };
      },
      color: () => 'blue',
    });

    liquid.render();

    // @ts-ignore
    expect(liquid.chart.middleGroup.getChildren()[0].getChildren()[1].attr('stroke')).toBe('blue'); // circle
    // @ts-ignore
    expect(liquid.chart.middleGroup.getChildren()[0].getChildren()[0].getChildren()[0].attr('fill')).toBe('green'); // wave path

    liquid.update({
      ...liquid.options,
      percent: 0.8,
    });

    // @ts-ignore
    expect(liquid.chart.middleGroup.getChildren()[0].getChildren()[0].getChildren()[0].attr('fill')).toBe('red'); // wave path
  });
});
