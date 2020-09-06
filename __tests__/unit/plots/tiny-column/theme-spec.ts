import { TinyColumn } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('tiny-column', () => {
  it('data', () => {
    const tinyColumn = new TinyColumn(createDiv(), {
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

    tinyColumn.render();
    // const elements = tinyColumn.chart.geometries[0].elements;
    expect(tinyColumn.chart.getTheme().colors10).toEqual(['blue', 'red', 'yellow', 'lightgreen', 'lightblue', 'pink']);
  });
});
