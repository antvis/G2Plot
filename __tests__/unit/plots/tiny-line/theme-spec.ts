import { TinyLine } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('tiny-line', () => {
  it('data', () => {
    const tinyLine = new TinyLine(createDiv(), {
      width: 80,
      height: 40,
      meta: {
        value: {
          min: 0,
          max: 5000,
        },
      },
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      autoFit: false,
      theme: {
        colors10: ['blue', 'red', 'yellow', 'lightgreen', 'lightblue', 'pink'],
      },
    });

    tinyLine.render();
    const elements = tinyLine.chart.geometries[0].elements;
    expect(elements.length).toBe(1);
    expect(tinyLine.chart.getTheme().colors10).toEqual(['blue', 'red', 'yellow', 'lightgreen', 'lightblue', 'pink']);

    tinyLine.destroy();
  });
});
