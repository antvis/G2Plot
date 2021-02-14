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
    ],
  });

  plot.render();

  it('association: active & highlight', async () => {
    expect(plot.chart.views.length).toBe(2);

    const view1 = plot.chart.views[0];
    const view2 = plot.chart.views[1];
    const shape11 = view1.geometries[0].elements[0].shape;
    view1.emit('element:mouseenter', { target: shape11, data: { data: data[0] } });
    expect(view1.geometries[0].elements[0].getStates()).toMatchObject(['active']);
    expect(view2.geometries[0].elements[0].getStates()).toMatchObject(['active']);
    expect(view1.geometries[0].elements[1].getStates()).toMatchObject(['inactive']);
    expect(view2.geometries[0].elements[1].getStates()).toMatchObject(['inactive']);

    view1.emit('element:mouseleave');
    expect(view1.geometries[0].elements[0].getStates()).toMatchObject([]);
    expect(view2.geometries[0].elements[0].getStates()).toMatchObject([]);
    expect(view1.geometries[0].elements[1].getStates()).toMatchObject([]);
    expect(view2.geometries[0].elements[1].getStates()).toMatchObject([]);

    view2.emit('element:mouseenter', { target: view2.geometries[0].elements[0].shape, data: { data: data[0] } });
    expect(view1.geometries[0].elements[0].getStates()).toMatchObject(['active']);
    expect(view2.geometries[0].elements[0].getStates()).toMatchObject(['active']);

    view2.emit('element:mouseleave');
    view2.emit('element:mouseenter', {
      target: view2.geometries[0].elements[2].shape,
      data: { data: { type: '3', value: 41 } },
    });
    expect(view1.geometries[0].elements[2].getStates()).not.toMatchObject(['active']);
    expect(view2.geometries[0].elements[2].getStates()).toMatchObject(['active']);
  });

  afterAll(() => {
    plot.destroy();
  });
});
