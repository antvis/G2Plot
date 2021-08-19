import { TinyColumn } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('tiny-column pattern', () => {
  it('pattern: obj', () => {
    const tinyColumn = new TinyColumn(createDiv(), {
      width: 200,
      height: 100,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      pattern: {
        type: 'line',
      },
    });

    tinyColumn.render();

    const geometry = tinyColumn.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    tinyColumn.update({
      pattern: false,
    });
    expect(tinyColumn.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    tinyColumn.destroy();
  });

  it('pattern: callback', () => {
    const tinyColumn = new TinyColumn(createDiv(), {
      width: 200,
      height: 100,
      data: partySupport
        .filter((o) => o.type === 'FF')
        .map((item) => {
          return item.value;
        }),
      pattern: ({ y }) => {
        if (y > 4600) {
          return { type: 'dot' };
        }
      },
    });

    tinyColumn.render();

    const geometry = tinyColumn.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[9].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[10].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(elements[11].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    tinyColumn.update({
      pattern: ({ y }) => {
        if (y === 3800) {
          return { type: 'dot' };
        }
      },
    });

    expect(tinyColumn.chart.geometries[0].elements[8].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(tinyColumn.chart.geometries[0].elements[9].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    tinyColumn.destroy();
  });
});
