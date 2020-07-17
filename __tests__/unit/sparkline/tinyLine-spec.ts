import { TinyLine } from '../../../src';
import { partySupport } from '../../data/party-support';
import { createDiv } from '../../utils/dom';

describe('tinyLine', () => {
  it('x*y', () => {
    const tinyLine = new TinyLine(createDiv(), {
      width: 80,
      height: 40,
      data: partySupport.filter((o) => o.type === 'FF'),
      xField: 'date',
      yField: 'value',
      autoFit: false,
    });

    tinyLine.render();
    expect(tinyLine.chart.geometries[0].elements.length).toBe(1);
  });

  it('x*y with color', () => {
    const tinyLine = new TinyLine(createDiv(), {
      width: 80,
      height: 40,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      color: ['blue', 'red'],
      seriesField: 'type',
      connectNulls: true,
      meta: {
        value: {
          min: 0,
          max: 5000,
        },
      },
      autoFit: false,
    });

    tinyLine.render();

    const geometry = tinyLine.chart.geometries[0];
    const elements = geometry.elements;
    // @ts-ignore
    expect(geometry.connectNulls).toBe(true);
    expect(elements.length).toBe(2);
    expect(elements[0].getModel().color).toBe('blue');
    expect(elements[1].getModel().color).toBe('red');

    expect(geometry.scales.value.min).toBe(0);
    expect(geometry.scales.value.max).toBe(5000);
  });
});
