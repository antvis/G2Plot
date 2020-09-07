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

  it('x cat scale', () => {
    const data = [
      { x: 1, y: 1 },
      { x: 2, y: 4 },
      { x: 3, y: 5 },
      { x: 4, y: 2 },
    ];
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: data,
      xField: 'x',
      yField: 'y',
    });

    area.render();

    expect(area.options.meta.x.type).toBe('cat');
    expect(area.chart.getScaleByField('x').range).toEqual([0, 1]);
    area.update({
      ...area.options,
      meta: {
        x: {
          type: 'linear',
          range: [0.1, 0.9],
        },
      },
    });

    expect(area.options.meta.x.type).toBe('linear');
    expect(area.chart.getScaleByField('x').range).toEqual([0.1, 0.9]);
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
