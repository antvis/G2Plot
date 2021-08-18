import { Chart } from '@antv/g2';
import { execViewAdaptor } from '../../../../src/plots/facet/utils';
import { createDiv } from '../../../utils/dom';

describe('facet', () => {
  const data = [
    { type: '1', date: '2014-01', value: 1, name: 'a' },
    { type: '1', date: '2015-01', value: 1, name: 'b' },
    { type: '1', date: '2016-01', value: 1, name: 'c' },
    { type: '1', date: '2017-01', value: 1, name: 'd' },
    { type: '2', date: '2014-01', value: 1, name: 'a' },
    { type: '2', date: '2015-01', value: 1, name: 'b' },
    { type: '2', date: '2016-01', value: 1, name: 'a' },
    { type: '2', date: '2017-01', value: 1, name: 'd' },
    { type: '3', date: '2014-01', value: 1, name: 'b' },
    { type: '4', date: '2015-01', value: 1, name: 'd' },
    { type: '4', date: '2016-01', value: 10, name: 'b' },
    { type: '4', date: '2017-01', value: 1, name: 'c' },
  ];

  const view = new Chart({ container: createDiv(), width: 500, height: 500 });

  execViewAdaptor(view, {
    data,
    geometries: [{ type: 'point', xField: 'date', yField: 'value', colorField: 'name', mapping: {} }],
  });

  view.render();

  it('exec view adaptor', () => {
    expect(view.geometries.length).toBe(1);

    view.clear();
    execViewAdaptor(view, {
      data,
      geometries: [
        { type: 'point', xField: 'date', yField: 'value', colorField: 'name', mapping: {} },
        { type: 'interval', xField: 'date', yField: 'value', colorField: 'name', mapping: {} },
      ],
    });

    view.render();
    expect(view.geometries.length).toBe(2);
  });

  it('animation: false', () => {
    view.clear();
    execViewAdaptor(view, {
      data,
      geometries: [
        { type: 'point', xField: 'date', yField: 'value', colorField: 'name', mapping: {} },
        { type: 'interval', xField: 'date', yField: 'value', colorField: 'name', mapping: {} },
      ],
      animation: false,
    });

    view.render();
    expect(view.geometries[0].animateOption).toBe(false);
    expect(view.geometries[1].animateOption).toBe(false);
  });

  it('annotation', () => {
    view.clear();
    execViewAdaptor(view, {
      data,
      geometries: [
        { type: 'point', xField: 'date', yField: 'value', colorField: 'name', mapping: {} },
        { type: 'interval', xField: 'date', yField: 'value', colorField: 'name', mapping: {} },
      ],
      annotations: [{ type: 'text', position: ['50%', '50%'], content: 'xx' }],
    });

    view.render();
    expect(view.getController('annotation').getComponents().length).toBe(1);
  });

  it('interacions', () => {
    view.clear();
    expect(view.interactions['active-region']).toBeUndefined();

    execViewAdaptor(view, {
      data,
      geometries: [
        { type: 'point', xField: 'date', yField: 'value', colorField: 'name', mapping: {} },
        { type: 'interval', xField: 'date', yField: 'value', colorField: 'name', mapping: {} },
      ],
      interactions: [{ type: 'tooltip', enable: false }, { type: 'active-region' }],
    });

    view.render();
    expect(view.interactions['tooltip']).toBeUndefined();
    expect(view.interactions['active-region']).not.toBeUndefined();
  });

  it('coordinate', () => {
    view.clear();

    execViewAdaptor(view, {
      data,
      geometries: [
        { type: 'point', xField: 'date', yField: 'value', colorField: 'name', mapping: {} },
        { type: 'interval', xField: 'date', yField: 'value', colorField: 'name', mapping: {} },
      ],
      coordinate: { type: 'polar' },
    });

    view.render();
    expect(view.getCoordinate().type).toBe('polar');
  });

  afterAll(() => {
    view.destroy();
  });
});
