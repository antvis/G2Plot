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
      autoFit: false,
    });

    tinyArea.render();
    expect(tinyArea.chart.geometries.length).toBe(2);
    expect(tinyArea.chart.geometries[0].shapeType).toEqual('area');
    expect(tinyArea.chart.geometries[1].shapeType).toEqual('line');
  });

  it('data with area style', () => {
    const tinyArea = new TinyArea(createDiv(), {
      width: 200,
      height: 100,
      areaStyle: {
        fill: '#123456',
      },
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      autoFit: false,
    });

    tinyArea.render();
    expect(tinyArea.chart.geometries[0].elements[0].shape.attr('fill')).toEqual('#123456');
  });

  it('data with smooth', () => {
    const tinyArea = new TinyArea(createDiv(), {
      width: 200,
      height: 100,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      autoFit: false,
      smooth: true,
    });

    tinyArea.render();
    expect(tinyArea.chart.geometries[0].attributes.shape.values).toEqual(['smooth']);
    expect(tinyArea.chart.geometries[0].elements.length).toBe(1);
  });

  it('data with line style', () => {
    const tinyArea = new TinyArea(createDiv(), {
      width: 200,
      height: 100,
      smooth: true,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      lineStyle: {
        stroke: '#123456',
        lineDash: [2, 2],
        lineWidth: 2,
      },
      autoFit: false,
      appendPadding: 10,
    });

    tinyArea.render();

    const geometry = tinyArea.chart.geometries[1];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('lineDash')).toEqual([2, 2]);
    expect(elements[0].shape.attr('stroke')).toEqual('#123456');
    expect(elements[0].shape.attr('lineWidth')).toEqual(2);

    tinyArea.update({
      ...tinyArea.options,
      lineStyle: () => {
        return {
          stroke: '#123456',
          lineDash: [4, 4],
          lineWidth: 2,
        };
      },
    });

    expect(tinyArea.chart.geometries[1].elements[0].shape.attr('lineDash')).toEqual([4, 4]);
    expect(tinyArea.chart.geometries[1].elements[0].shape.attr('stroke')).toEqual('#123456');
    expect(tinyArea.chart.geometries[1].elements[0].shape.attr('lineWidth')).toEqual(2);
  });
});
