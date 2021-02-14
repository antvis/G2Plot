import { registerInteraction } from '@antv/g2';
import { MultiView } from '../../../../../src';
import { createDiv } from '../../../../utils/dom';

describe('assocation between views in multi-view plot', () => {
  const data = [
    { type: '1', value: 123 },
    { type: '2', value: 41 },
  ];
  const div = createDiv();
  const plot = new MultiView(div, {
    width: 400,
    height: 200,
    autoFit: false,
    tooltip: false,
    plots: [
      {
        type: 'pie',
        region: { start: { x: 0, y: 0 }, end: { x: 0.45, y: 1 } },
        options: {
          data: [...data, { type: '4', value: 41 }],
          angleField: 'value',
          colorField: 'type',
          tooltip: {},
          interactions: [
            { type: 'association-active' },
            { type: 'association-highlight' },
            { type: 'association-tooltip' },
          ],
        },
      },
      {
        type: 'pie',
        region: { start: { x: 0.5, y: 0 }, end: { x: 1, y: 1 } },
        options: {
          data: [...data, { type: '3', value: 41 }],
          angleField: 'value',
          colorField: 'type',
          tooltip: {},
          interactions: [{ type: 'association-active' }],
        },
      },
      {
        type: 'line',
        options: {
          data: [
            { date: '02-12', value: 12, type: '1' },
            { date: '02-12', value: 124, type: '2' },
            { date: '02-13', value: 22, type: '1' },
            { date: '02-13', value: 94, type: '2' },
          ],
          xField: 'date',
          yField: 'value',
          seriesField: 'type',
        },
      },
      {
        type: 'column',
        options: {
          data,
          xField: 'type',
          yField: 'value',
          seriesField: 'type',
        },
      },
    ],
  });

  plot.render();
  let view1 = plot.chart.views[0];
  let view2 = plot.chart.views[1];
  let view3 = plot.chart.views[2];

  it('association: active & highlight', async () => {
    const shape11 = view1.geometries[0].elements[0].shape;
    view1.emit('element:mouseenter', { target: shape11, data: { data: data[0] } });
    expect(view1.geometries[0].elements[0].getStates()).toMatchObject(['active']);
    expect(view2.geometries[0].elements[0].getStates()).toMatchObject(['active']);
    expect(view1.geometries[0].elements[1].getStates()).toMatchObject(['inactive']);
    expect(view2.geometries[0].elements[1].getStates()).toMatchObject(['inactive']);

    view1.emit('element:mouseleave', {});
    expect(view1.geometries[0].elements[0].getStates()).toMatchObject([]);
    expect(view2.geometries[0].elements[0].getStates()).toMatchObject([]);
    expect(view1.geometries[0].elements[1].getStates()).toMatchObject([]);
    expect(view2.geometries[0].elements[1].getStates()).toMatchObject([]);

    view2.emit('element:mouseenter', { target: view2.geometries[0].elements[0].shape, data: { data: data[0] } });
    expect(view1.geometries[0].elements[0].getStates()).toMatchObject(['active']);
    expect(view2.geometries[0].elements[0].getStates()).toMatchObject(['active']);

    view2.emit('element:mouseleave', {});
    view2.emit('element:mouseenter', {
      target: view2.geometries[0].elements[2].shape,
      data: { data: { type: '3', value: 41 } },
    });
    expect(view1.geometries[0].elements[2].getStates()).not.toMatchObject(['active']);
    expect(view2.geometries[0].elements[2].getStates()).toMatchObject(['active']);
    view2.emit('element:mouseleave', {});
  });

  it('association: with action args', () => {
    const shape11 = view1.geometries[0].elements[0].shape;
    view1.emit('element:mouseenter', { target: shape11, data: { data: data[0] } });
    expect(view1.geometries[0].elements[0].getStates()).toMatchObject(['active']);
    expect(view3.geometries[0].elements[0].getStates()).toMatchObject(['active']);
    view1.emit('element:mouseleave', {});

    const plots = plot.options.plots;
    // @ts-ignore
    plots[0].options.interactions = [
      {
        // 联动交互只作用在 x 字段上
        type: 'association-active',
        cfg: {
          start: [
            { trigger: 'element:mouseenter', action: 'association:active', arg: { dim: 'x', linkField: 'type' } },
          ],
        },
      },
    ];
    plot.update({ plots });
    view1 = plot.chart.views[0];
    view2 = plot.chart.views[1];
    view3 = plot.chart.views[2];

    view1.emit('element:mouseenter', {
      target: view1.geometries[0].elements[0].shape,
      data: { data: data[0] },
    });
    expect(view1.geometries[0].elements[0].getStates()).toMatchObject(['active']);
    expect(view2.geometries[0].elements[0].getStates()).toMatchObject(['active']);
    expect(view3.geometries[0].elements[0].getStates()).not.toMatchObject(['active']);
    expect(plot.chart.views[3].geometries[0].elements[0].getStates()).toMatchObject(['active']);
    view1.emit('element:mouseleave', {});

    // @ts-ignore
    plots[0].options.interactions = [
      {
        // 联动交互只作用在 x 字段上
        type: 'association-active',
        cfg: {
          start: [
            { trigger: 'element:mouseenter', action: 'association:active', arg: { dim: 'y', linkField: 'type1' } },
          ],
        },
      },
    ];
    plot.update({ plots });
    view1 = plot.chart.views[0];
    view2 = plot.chart.views[1];
    view3 = plot.chart.views[2];

    view1.emit('element:mouseenter', {
      target: view1.geometries[0].elements[0].shape,
      data: { data: data[0] },
    });
    expect(view1.geometries[0].elements[0].getStates()).not.toMatchObject(['active']);
    expect(view2.geometries[0].elements[0].getStates()).not.toMatchObject(['active']);
    expect(view3.geometries[0].elements[0].getStates()).not.toMatchObject(['active']);
    expect(plot.chart.views[3].geometries[0].elements[0].getStates()).not.toMatchObject(['active']);
    view1.emit('element:mouseleave', {});
  });

  it('register-action', () => {
    registerInteraction('association', {
      start: [
        { trigger: 'element:mouseenter', action: 'association:active' },
        { trigger: 'element:mousemove', action: 'association:highlight', arg: { dim: 'x', linkField: 'type' } },
        { trigger: 'element:mouseenter', action: 'association:showTooltip', arg: { dim: 'x', linkField: 'type' } },
      ],
      end: [
        { trigger: 'element:mouseleave', action: 'association:hideTooltip' },
        { trigger: 'element:mouseleave', action: 'association:reset' },
      ],
    });

    const plots = plot.options.plots;
    // @ts-ignore
    plots[0].options.interactions = [{ type: 'association' }];
    plot.update({ plots });
    view1 = plot.chart.views[0];
    view2 = plot.chart.views[1];
    view3 = plot.chart.views[2];
    const view4 = plot.chart.views[3];

    view1.emit('element:mouseenter', {
      target: view1.geometries[0].elements[0].shape,
      data: { data: data[0] },
    });
    expect(view1.geometries[0].elements[0].getStates()).toMatchObject(['active']);
    expect(view2.geometries[0].elements[0].getStates()).toMatchObject(['active']);
    expect(view3.geometries[0].elements[0].getStates()).toMatchObject(['active']);
    expect(view4.geometries[0].elements[0].getStates()).toMatchObject(['active']);
    view1.emit('element:mouseleave', {});

    view1.emit('element:mousemove', {
      target: view1.geometries[0].elements[0].shape,
      data: { data: data[0] },
    });
    expect(view1.geometries[0].elements[1].getStates()).toMatchObject([]);
    expect(view2.geometries[0].elements[1].getStates()).toMatchObject([]);

    // view3 在 x 字段上没有关联
    expect(view3.geometries[0].elements[0].getStates()).toMatchObject(['inactive']);
    expect(view3.geometries[0].elements[1].getStates()).toMatchObject(['inactive']);
    // view4 关联高亮
    expect(view4.geometries[0].elements[0].getStates()).not.toMatchObject(['inactive']);
    expect(view4.geometries[0].elements[1].getStates()).toMatchObject(['inactive']);
    view1.emit('element:mouseleave', {});
  });

  afterAll(() => {
    plot.destroy();
  });
});
