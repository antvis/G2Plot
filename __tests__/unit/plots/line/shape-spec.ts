import { Line } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('line', () => {
  it('x*y and shape', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      appendPadding: 10,
      smooth: false,
    });

    line.render();
    expect(line.chart.geometries[0].attributes.shape.values).toEqual(['line']);
  });

  it('x*y*color and shape', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      appendPadding: 10,
      smooth: true,
    });

    line.render();
    expect(line.chart.geometries[0].attributes.shape.values).toEqual(['smooth']);
  });
});
