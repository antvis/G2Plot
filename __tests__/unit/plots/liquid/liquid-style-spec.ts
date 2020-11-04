import { Liquid } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('liquid', () => {
  it('liquidStyle', () => {
    const liquid = new Liquid(createDiv(), {
      width: 600,
      height: 300,
      percent: 0.25,
      liquidStyle: ({ percent }) => {
        return {
          fill: percent > 0.75 ? 'red' : 'green',
        };
      },
      color: 'blue',
    });

    liquid.render();

    // @ts-ignore
    expect(liquid.chart.middleGroup.getChildren()[0].getChildren()[1].attr('stroke')).toBe('blue'); // circle
    // @ts-ignore
    expect(liquid.chart.middleGroup.getChildren()[0].getChildren()[0].getChildren()[0].attr('fill')).toBe('green'); // wave path

    // @ts-ignore
    liquid.chart.getController('annotation').clear(true);

    liquid.chart.clear();

    liquid.update({
      ...liquid.options,
      percent: 0.8,
    });

    // G2 chart.clear 的时候，geometry 销毁了，但是 container 还保留的，内存泄露。
    // @ts-ignore
    expect(liquid.chart.middleGroup.getChildren()[0].getChildren()[0].getChildren()[0].attr('fill')).toBe('red'); // wave path
  });
});
