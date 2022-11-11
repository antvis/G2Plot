import { TinyColumn } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('tiny-column', () => {
  it('change data', () => {
    const data = partySupport
      .filter((o) => o.type === 'FF')
      .map((item) => {
        return item.value;
      });
    const tinyColumn = new TinyColumn(createDiv(), {
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

    tinyColumn.render();

    expect(tinyColumn.chart.geometries[0].elements.length).toEqual(data.length);
    expect(tinyColumn.options.data).toEqual(data);

    const newData = partySupport
      .filter((o) => ['FF', 'SF'].includes(o.type))
      .map((item) => {
        return item.value;
      });
    tinyColumn.changeData(newData);

    expect(tinyColumn.chart.geometries[0].elements.length).toEqual(newData.length);
    expect(tinyColumn.options.data).toEqual(newData);

    tinyColumn.destroy();
  });

  it('add data', () => {
    const data = partySupport
      .filter((o) => o.type === 'FF')
      .map((item) => {
        return item.value;
      });
    const tinyColumn = new TinyColumn(createDiv(), {
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

    tinyColumn.render();

    expect(tinyColumn.chart.geometries[0].elements.length).toEqual(data.length);
    expect(tinyColumn.options.data).toEqual(data);

    const newData = [...data, 1900, 2000];
    tinyColumn.changeData(newData);

    expect(tinyColumn.chart.geometries[0].elements.length).toEqual(newData.length);
    expect(tinyColumn.options.data).toEqual(newData);

    tinyColumn.destroy();
  });

  it('change empty data', () => {
    const data = partySupport
      .filter((o) => o.type === 'FF')
      .map((item) => {
        return item.value;
      });
    const tinyColumn = new TinyColumn(createDiv(), {
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

    tinyColumn.render();

    expect(tinyColumn.chart.geometries[0].elements.length).toEqual(data.length);
    expect(tinyColumn.options.data).toEqual(data);

    const newData = [];
    tinyColumn.changeData(newData);

    expect(tinyColumn.chart.geometries[0].elements.length).toEqual(newData.length);
    expect(tinyColumn.options.data).toEqual(newData);

    tinyColumn.destroy();
  });
});
