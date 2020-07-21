import { TinyColumn } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('tiny-column', () => {
  it('data', () => {
    const tinyColumn = new TinyColumn(createDiv(), {
      width: 200,
      height: 100,
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

    tinyColumn.render();
    console.log(tinyColumn);
    expect(tinyColumn.chart.geometries[0].elements.length).toBe(52);
  });

  it('data with style', () => {
    const tinyColumn = new TinyColumn(createDiv(), {
      width: 200,
      height: 100,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      columnStyle: {
        fill: '#123456',
        stroke: '#654321',
        lineWidth: 2,
        lineDash: [2, 2],
        opacity: 0.5,
      },
      autoFit: false,
      appendPadding: 10,
    });

    tinyColumn.render();

    const geometry = tinyColumn.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('lineDash')).toEqual([2, 2]);
    expect(elements[0].shape.attr('fill')).toEqual('#123456');
    expect(elements[0].shape.attr('stroke')).toEqual('#654321');
    expect(elements[0].shape.attr('lineWidth')).toEqual(2);
    expect(elements[0].shape.attr('opacity')).toEqual(0.5);

    tinyColumn.update({
      ...tinyColumn.options,
      columnStyle: () => {
        return { lineDash: [4, 4] };
      },
    });
    expect(tinyColumn.chart.geometries[0].elements[0].shape.attr('lineDash')).toEqual([4, 4]);
  });
});
