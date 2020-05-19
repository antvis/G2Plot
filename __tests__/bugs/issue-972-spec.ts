import { Gauge } from '../../src';
import { createDiv } from '../utils/dom';

describe('#972', () => {
  it('gauge axis visible false', () => {
    const gaugePlot = new Gauge(createDiv(), {
      width: 400,
      height: 400,
      value: 64,
      min: 0,
      max: 100,
      range: [0, 25, 50, 75, 100],
      color: ['#39B8FF', '#52619B', '#43E089', '#C0EDF3'],
      axis: {
        visible: false,
      },
    });
    gaugePlot.render();
    const view = gaugePlot.getLayers()[0].view;
    const axisController = view.controllers[0];
    // @ts-ignore
    expect(axisController.option.value).toBe(false);
    const tickLine = view.geometries[0].container.findAll((el) => {
      if (el.get('name')) {
        const name = el.get('name').split('-');
        return name === 'axis-tickLine';
      }
    });
    expect(tickLine.length).toBe(0);
  });

  it('hide axis tickLine', () => {
    const gaugePlot = new Gauge(createDiv(), {
      width: 400,
      height: 400,
      value: 64,
      min: 0,
      max: 100,
      range: [0, 25, 50, 75, 100],
      color: ['#39B8FF', '#52619B', '#43E089', '#C0EDF3'],
      axis: {
        visible: true,
        tickLine: {
          visible: false,
        },
      },
    });
    gaugePlot.render();
    const view = gaugePlot.getLayers()[0].view;
    const axisController = view.controllers[0];
    // @ts-ignore
    expect(axisController.option.value).toBeInstanceOf(Object);
    const tickLine = view.geometries[0].container.findAll((el) => {
      if (el.get('name')) {
        const name = el.get('name').split('-');
        return name === 'axis-tickLine';
      }
    });
    expect(tickLine.length).toBe(0);
  });
});
