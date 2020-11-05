import { Area } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('area', () => {
  it('x*y and label', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      appendPadding: 10,
      label: {
        layout: {
          type: 'overlap',
        },
      },
    });

    area.render();
    // @ts-ignore
    expect(area.chart.geometries[0].labelOption.cfg).toEqual({
      layout: {
        type: 'overlap',
      },
    });

    area.update({
      ...area.options,
      label: false,
    });
    // @ts-ignore
    expect(area.chart.geometries[0].labelOption).toBe(false);

    area.destroy();
  });

  it('x*y*color and label', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      appendPadding: 10,
      label: {
        layout: {
          type: 'overlap',
        },
      },
    });

    area.render();
    // @ts-ignore
    expect(area.chart.geometries[0].labelOption.cfg).toEqual({
      layout: {
        type: 'overlap',
      },
    });

    area.destroy();
  });
});
