import { TinyLine } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('tiny-line', () => {
  it('x*y', () => {
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
    });

    tinyLine.render();
    expect(tinyLine.chart.geometries[0].elements.length).toBe(1);
  });
});
