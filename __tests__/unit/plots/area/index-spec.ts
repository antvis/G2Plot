import { Area } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('area', () => {
  it('x*y', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: partySupport.filter((o) => o.type === 'FF'),
      xField: 'date',
      yField: 'value',
    });

    area.render();

    expect(area.chart.geometries[0].elements.length).toBe(1);
  });

  it('x*y with color', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      color: ['blue', 'red'],
      appendPadding: 10,
      meta: {
        value: {
          min: 0,
          max: 5000,
        },
      },
    });

    area.render();

    const geometry = area.chart.geometries[0];
    const elements = geometry.elements;

    expect(elements.length).toBe(2);
    expect(elements[0].getModel().color).toBe('blue');
    expect(elements[1].getModel().color).toBe('red');

    expect(geometry.scales.value.min).toBe(0);
    expect(geometry.scales.value.max).toBe(5000);
  });
});
