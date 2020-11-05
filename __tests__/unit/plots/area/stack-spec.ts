import { Area } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('area', () => {
  it('stack area', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      color: ['blue', 'red'],
      appendPadding: 10,
    });

    area.render();

    expect(area.options.isStack).toBe(true);
    expect(area.chart.geometries[0].getAdjust('stack')).toBeDefined();

    area.update({
      ...area.options,
      isStack: false,
    });
    expect(area.options.isStack).toBe(false);

    expect(area.chart.geometries[0].type).toBe('area');
    expect(area.chart.geometries[0].getAdjust('stack')).toBeUndefined();

    // @ts-ignore
    expect(area.chart.getOptions().legends.type.position).toBe('top-left');

    area.destroy();
  });
});
