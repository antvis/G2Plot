import { Area } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('area', () => {
  it('x*y and shape', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      appendPadding: 10,
      smooth: false,
    });

    area.render();
    expect(area.chart.geometries[0].attributes.shape.values).toEqual(['area']);

    area.destroy();
  });

  it('x*y*color and shape', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      appendPadding: 10,
      smooth: true,
    });

    area.render();
    expect(area.chart.geometries[0].attributes.shape.values).toEqual(['smooth']);

    area.destroy();
  });
});
