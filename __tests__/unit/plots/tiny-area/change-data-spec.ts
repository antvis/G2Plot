import { TinyArea } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('tiny-area', () => {
  it('change date', () => {
    const data = partySupport
      .filter((o) => o.type === 'FF')
      .map((item) => {
        return item.value;
      });
    const tinyArea = new TinyArea(createDiv(), {
      width: 200,
      height: 100,
      data,
      line: {},
      autoFit: false,
    });

    tinyArea.render();
    expect(tinyArea.options.data).toEqual(data);

    tinyArea.changeData(
      partySupport
        .filter((o) => ['FF', 'SF'].includes(o.type))
        .map((item) => {
          return item.value;
        })
    );
    expect(tinyArea.options.data).toEqual(
      partySupport
        .filter((o) => ['FF', 'SF'].includes(o.type))
        .map((item) => {
          return item.value;
        })
    );

    tinyArea.destroy();
  });

  it('add data', () => {
    const data = partySupport
      .filter((o) => o.type === 'FF')
      .map((item) => {
        return item.value;
      });
    const tinyArea = new TinyArea(createDiv(), {
      width: 200,
      height: 100,
      data,
      line: {},
      autoFit: false,
    });

    tinyArea.render();
    expect(tinyArea.options.data).toEqual(data);

    const newData = [...data, 999, 1500];
    tinyArea.changeData(newData);
    expect(tinyArea.options.data).toEqual(newData);

    tinyArea.destroy();
  });
});
