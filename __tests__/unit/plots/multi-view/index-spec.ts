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

    // [components] label
    expect(line.chart.views[0].geometries[0].labelsContainer.getChildren().length).toBe(0);
    const options = line.options;
    // @ts-ignore
    options.views[0].geometries[0].label = { content: () => 'hello' };
    line.update(options);
    expect(line.chart.views[0].geometries[0].labelsContainer.getChildren().length).toBe(data.length);
    // @ts-ignore
    expect(line.chart.views[0].geometries[0].labelsContainer.getChildren()[0].getChildren()[0].attr('text')).toBe(
      'hello'
    );

    // [components] annotations
    // @ts-ignore
    options.views[0].annotations = [{ type: 'text', content: 'G2Plot', position: ['50%', '50%'] }];
    line.update(options);
    expect(line.chart.views[0].getController('annotation').getComponents().length).toBe(1);

    // multi-view
    options.views.push({
      data,
      geometries: [
        {
          type: 'interval',
          xField: 'date',
          yField: 'value',
          colorField: 'type',
          mapping: {},
        },
      ],
      annotations: [{ type: 'text', content: 'view2', position: ['50%', '50%'] }],
    });
    line.update(options);
    expect(line.chart.views[1].getController('annotation').getComponents().length).toBe(1);

    line.destroy();
  });
});
