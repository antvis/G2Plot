import { Liquid } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2236', () => {
  it('liquid distance', () => {
    const liquid = new Liquid(createDiv(), {
      autoFit: false,
      width: 300,
      height: 300,
      percent: 0.25,
      outline: {
        border: 4,
        distance: 1,
      },
      wave: {
        length: 128,
      },
    });

    liquid.render();

    // @ts-ignore
    expect(liquid.chart.middleGroup.getChildren()[0].getChildren()[1].get('clipShape').attr('r')).toBe(132);
    // clipShape r + distance + border / 2
    // @ts-ignore
    expect(liquid.chart.middleGroup.getChildren()[0].getChildren()[0].attr('r')).toBe(132 + 1 + 4 / 2);

    liquid.destroy();
  });
});
