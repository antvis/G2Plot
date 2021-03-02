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
    expect(liquid.chart.middleGroup.getChildren()[0].getChildren()[1].get('clipShape').attr('path')).toEqual([
      ['M', 150, 18],
      ['A', 132, 132, 0, 1, 0, 150, 282],
      ['A', 132, 132, 0, 1, 0, 150, 18],
      ['Z'],
    ]);

    // clipShape r + distance + border / 2
    // @ts-ignore
    expect(liquid.chart.middleGroup.getChildren()[0].getChildren()[0].attr('path')).toEqual([
      ['M', 150, 15],
      ['A', 135, 135, 0, 1, 0, 150, 285],
      ['A', 135, 135, 0, 1, 0, 150, 15],
      ['Z'],
    ]);

    liquid.destroy();
  });
});
