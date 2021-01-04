import { partySupport } from '../../../data/party-support';
import { TinyArea } from '../../../../src';
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
    console.log(tinyArea.chart, data.length);
    expect(tinyArea.chart.geometries[0].elements.length).toEqual(data.length);

    tinyArea.changeData(
      partySupport
        .filter((o) => ['FF', 'SF'].includes(o.type))
        .map((item) => {
          return item.value;
        })
    );
    expect(tinyArea.chart.geometries[0].elements.length).toEqual(
      partySupport
        .filter((o) => ['FF', 'SF'].includes(o.type))
        .map((item) => {
          return item.value;
        }).length
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
    expect(tinyArea.chart.geometries[0].elements.length).toEqual(data.length);

    tinyArea.changeData([...data, 999, 1500]);
    expect(tinyArea.chart.geometries[0].elements.length).toEqual(data.length + 2);

    tinyArea.destroy();
  });
});
