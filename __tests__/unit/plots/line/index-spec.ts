import { Line } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('line', () => {
  it('x*y', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: partySupport.filter((o) => o.type === 'FF'),
      xField: 'date',
      yField: 'value',
    });

    line.render();

    expect(line.chart.geometries[0].elements.length).toBe(1);

    line.destroy();
  });

  it('x*y with color', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      color: ['blue', 'red'],
      appendPadding: 10,
      connectNulls: true,
      meta: {
        value: {
          min: 0,
          max: 5000,
        },
      },
    });

    line.render();

    const geometry = line.chart.geometries[0];
    const elements = geometry.elements;
    // @ts-ignore
    expect(geometry.connectNulls).toBe(true);
    expect(elements.length).toBe(2);
    expect(elements[0].getModel().color).toBe('blue');
    expect(elements[1].getModel().color).toBe('red');

    expect(geometry.scales.value.min).toBe(0);
    expect(geometry.scales.value.max).toBe(5000);

    line.destroy();
  });

  it('x cat scale', () => {
    const data = [
      { x: 1, y: 1 },
      { x: 2, y: 4 },
      { x: 3, y: 5 },
      { x: 4, y: 2 },
    ];
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: data,
      xField: 'x',
      yField: 'y',
    });

    line.render();

    expect(line.chart.getScaleByField('x').type).toBe('cat');
    expect(line.chart.getScaleByField('x').range).toEqual([1 / 8, 7 / 8]);
    line.update({
      meta: {
        x: {
          type: 'linear',
          range: [0.1, 0.9],
        },
      },
    });

    expect(line.chart.getScaleByField('x').type).toBe('linear');
    expect(line.chart.getScaleByField('x').range).toEqual([0.1, 0.9]);

    line.destroy();
  });
});
