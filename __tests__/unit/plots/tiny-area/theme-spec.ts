import { TinyArea } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('tiny-area', () => {
  it('data', () => {
    const tinyArea = new TinyArea(createDiv(), {
      width: 200,
      height: 100,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      theme: {
        colors10: ['blue', 'red', 'yellow', 'lightgreen', 'lightblue', 'pink'],
      },
    });

    tinyArea.render();
    const elements = tinyArea.chart.geometries[0].elements;
    expect(elements.length).toBe(1);
    expect(tinyArea.chart.getTheme().colors10).toEqual(['blue', 'red', 'yellow', 'lightgreen', 'lightblue', 'pink']);

    tinyArea.destroy();
  });
});
