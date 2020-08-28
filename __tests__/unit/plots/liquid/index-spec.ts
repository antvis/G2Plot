import { Liquid } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('liquid', () => {
  it('liquid', () => {
    const liquid = new Liquid(createDiv(), {
      width: 600,
      height: 300,
      // autoFit: false,
      appendPadding: 10,
      percent: 0.75,
      // color: (v: number) => {
      //   return 'yellow';
      // },
      // color: 'blue',
    });

    liquid.render();

    // @ts-ignore
    window.liquid = liquid;

    expect(liquid.chart.geometries[0].elements.length).toBe(1);
  });
});
