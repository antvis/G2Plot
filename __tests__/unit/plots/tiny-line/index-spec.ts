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
    });

    tinyLine.render();
    expect(tinyLine.chart.geometries[0].elements.length).toBe(1);
  });

  it('data with smooth', () => {
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
      smooth: true,
    });

    tinyLine.render();
    expect(tinyLine.chart.geometries[0].attributes.shape.values).toEqual(['smooth']);
    expect(tinyLine.chart.geometries[0].elements.length).toBe(1);
  });

  it('data with style', () => {
    const tinyLine = new TinyLine(createDiv(), {
      width: 80,
      height: 40,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      lineStyle: {
        lineDash: [2, 2],
      },
      autoFit: false,
      appendPadding: 10,
    });

    tinyLine.render();

    const geometry = tinyLine.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('lineDash')).toEqual([2, 2]);

    tinyLine.update({
      ...tinyLine.options,
      lineStyle: () => {
        return { lineDash: [4, 4] };
      },
    });
    expect(tinyLine.chart.geometries[0].elements[0].shape.attr('lineDash')).toEqual([4, 4]);
  });
});
