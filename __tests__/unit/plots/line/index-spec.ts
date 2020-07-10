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
    });

    line.render();

    const geometry = line.chart.geometries[0];
    const elements = geometry.elements;
    // @ts-ignore
    expect(geometry.connectNulls).toBe(true);
    expect(elements.length).toBe(2);
    expect(elements[0].getModel().color).toBe('blue');
    expect(elements[1].getModel().color).toBe('red');
  });
});
