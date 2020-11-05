import { Lab } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { partySupport } from '../../../data/party-support';

describe('multi-view', () => {
  it('simple line', () => {
    const data = partySupport.filter((o) => ['FF', 'Lab'].includes(o.type));
    const line = new Lab.MultiView(createDiv(), {
      width: 400,
      height: 300,
      views: [
        {
          data,
          meta: {
            value: {
              type: 'log',
            },
          },
          axes: {
            date: {
              tickCount: 5,
            },
            value: {
              title: {},
              tickCount: 3,
            },
          },
          geometries: [
            {
              type: 'line',
              xField: 'date',
              yField: 'value',
              colorField: 'type',
              mapping: {},
            },
          ],
        },
      ],
      legend: {
        type: {},
      },
    });

    line.render();

    expect(line.chart.getOptions().data).toEqual([]);

    expect(line.chart.getOptions().legends).toEqual({ type: {} });
    expect(line.chart.views.length).toBe(1);
    expect(line.chart.views[0].getOptions().data).toBe(data);
    expect(line.chart.views[0].getOptions().legends).toEqual({ date: false, value: false });

    expect(line.chart.views[0].geometries.length).toBe(1);

    // attr mapping
    // @ts-ignore
    const attr = line.chart.views[0].geometries[0].attributeOption;

    expect(attr.color).toEqual({ fields: ['type'] });
    expect(attr.position).toEqual({ fields: ['date', 'value'] });

    // scale
    expect(line.chart.views[0].getXScale().tickCount).toBe(5);
    expect(line.chart.views[0].getYScales()[0].type).toBe('log');
    expect(line.chart.views[0].getYScales()[0].tickCount).toBe(3);

    line.destroy();
  });
});
