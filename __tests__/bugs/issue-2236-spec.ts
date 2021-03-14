import { Liquid } from '../../src';
import { createDiv } from '../utils/dom';
import { getRadius } from '../unit/plots/liquid/index-spec';

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
    expect(getRadius(liquid)).toBe(133);

    liquid.destroy();
  });
});
