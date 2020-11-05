import { Line } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('line', () => {
  it('x*y*color and axis options', () => {
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
      stepType: 'hv',
    });

    line.render();

    const geometry = line.chart.geometries[0];
    const elements = geometry.elements;
    // @ts-ignore
    expect(geometry.connectNulls).toBe(true);
    expect(elements.length).toBe(2);
    expect(elements[0].getModel().shape).toBe('hv');

    line.destroy();
  });
});
