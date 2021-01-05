import { partySupport } from '../../../data/party-support';
import { TinyLine } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('tiny-line', () => {
  it('change data', () => {
    const data = partySupport
      .filter((o) => o.type === 'FF')
      .map((item) => {
        return item.value;
      });
    const tinyLine = new TinyLine(createDiv(), {
      width: 200,
      height: 100,
      meta: {
        y: {
          min: 0,
          max: 5000,
        },
      },
      data,
      autoFit: false,
    });

    tinyLine.render();

    expect(tinyLine.options.data).toEqual(data);

    const newData = partySupport
      .filter((o) => ['FF', 'SF'].includes(o.type))
      .map((item) => {
        return item.value;
      });
    tinyLine.changeData(newData);

    expect(tinyLine.options.data).toEqual(newData);

    tinyLine.destroy();
  });

  it('add data', () => {
    const data = partySupport
      .filter((o) => o.type === 'FF')
      .map((item) => {
        return item.value;
      });
    const tinyLine = new TinyLine(createDiv(), {
      width: 200,
      height: 100,
      meta: {
        y: {
          min: 0,
          max: 5000,
        },
      },
      data,
      autoFit: false,
    });

    tinyLine.render();
    console.log('tinyLine.chart', tinyLine.chart);
    expect(tinyLine.options.data).toEqual(data);

    const newData = [...data, 1900, 2000, 2200];
    tinyLine.changeData(newData);

    expect(tinyLine.options.data).toEqual(newData);

    tinyLine.destroy();
  });

  it('change empty data', () => {
    const data = partySupport
      .filter((o) => o.type === 'FF')
      .map((item) => {
        return item.value;
      });
    const tinyLine = new TinyLine(createDiv(), {
      width: 200,
      height: 100,
      meta: {
        y: {
          min: 0,
          max: 5000,
        },
      },
      data,
      autoFit: false,
    });

    tinyLine.render();

    expect(tinyLine.options.data).toEqual(data);

    const newData = [];
    tinyLine.changeData(newData);

    expect(tinyLine.options.data).toEqual(newData);

    tinyLine.destroy();
  });
});
