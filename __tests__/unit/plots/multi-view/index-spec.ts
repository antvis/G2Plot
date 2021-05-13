import { Lab, Mix, MultiView } from '../../../../src';
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

  it('add interactions', () => {
    const data = partySupport.filter((o) => ['FF', 'Lab'].includes(o.type));
    const line = new Lab.MultiView(createDiv(), {
      width: 400,
      height: 300,
      views: [
        {
          data,
          interactions: [{ type: 'tooltip' }, { type: 'element-highlight-by-color' }],
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
        {
          data,
          interactions: [{ type: 'tooltip', enable: false }],
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

    expect(line.chart.views[0].interactions['element-highlight-by-color']).toBeDefined();
    expect(line.chart.views[0].interactions['tooltip']).toBeDefined();
    // `enable: false` 移除交互
    expect(line.chart.views[1].interactions['tooltip']).not.toBeDefined();
  });

  it('animation for each view', () => {
    const data = new Array(30).fill(1).map((d, idx) => ({ x: `${idx}`, y: idx + Math.random() * 10 }));
    const plot = new Mix(createDiv(), {
      animation: false,
      views: [
        {
          data,
          region: { start: { x: 0, y: 0 }, end: { x: 0.5, y: 1 } },
          geometries: [{ type: 'line', xField: 'x', yField: 'y', mapping: {} }],
        },
        {
          data,
          region: { start: { x: 0.5, y: 0 }, end: { x: 1, y: 1 } },
          geometries: [{ type: 'line', xField: 'x', yField: 'y', mapping: {} }],
        },
      ],
    });
    plot.render();
    // @ts-ignore
    expect(plot.chart.options.animate).toBe(false);

    plot.update({ animation: { appear: { animation: 'fade-in' } } });
    // @ts-ignore
    expect(plot.chart.options.animate).toBe(true);
    // @ts-ignore chart 上的设置不可生效, todo 是否要作用到每个 view 上
    expect(plot.chart.views[0].geometries[0].animateOption).not.toBeDefined();

    const views = plot.options.views;
    // @ts-ignore
    views[0].animation = { appear: { animation: 'fade-in' } };
    plot.update({ animation: false, views });
    // @ts-ignore
    expect(plot.chart.views[0].options.animate).toBe(true);
    // @ts-ignore
    expect(plot.chart.views[0].geometries[0].animateOption.appear.animation).toBe('fade-in');
  });

  it('MultiView 依然可以使用', () => {
    const data = partySupport.filter((o) => ['FF', 'Lab'].includes(o.type));
    const line = new MultiView(createDiv(), {
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
