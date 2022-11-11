import { Mix } from '../../../src';
import { findViewById, getSiblingViews, getViews } from '../../../src/utils/view';
import { createDiv } from '../../utils/dom';

describe('utils of view', () => {
  const plot = new Mix(createDiv(), {
    views: [
      {
        data: [{ x: 'x', y: 1 }],
        geometries: [{ type: 'line', xField: 'x', yField: 'y', mapping: {} }],
      },
      {
        data: [{ x: 'x', y: 1 }],
        geometries: [{ type: 'interval', xField: 'x', yField: 'y', mapping: {} }],
      },
    ],
  });
  plot.render();

  it('find-view-by-id', () => {
    const views = plot.chart.views;
    expect(findViewById(plot.chart, views[0].id)).toEqual(views[0]);
  });

  it('getViews', () => {
    const views = plot.chart.views;
    expect(getViews(views[0])).toEqual(views);
    expect(getViews(plot.chart)).toEqual([]);
  });

  it('getSiblingViews', () => {
    const views = plot.chart.views;
    expect(getSiblingViews(views[0]).length).toBe(1);
    expect(getSiblingViews(views[0])).toEqual([views[1]]);
    expect(getSiblingViews(plot.chart).length).toBe(0);
    expect(getSiblingViews(plot.chart)).toEqual([]);
  });

  afterAll(() => {
    plot.destroy();
  });
});
