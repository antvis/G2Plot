import { MultiView } from '../../../src';
import { findViewById, getViews, getSilbingViews } from '../../../src/utils/view';
import { createDiv } from '../../utils/dom';

describe('utils of view', () => {
  const plot = new MultiView(createDiv(), {
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
  });

  it('getSilbingViews', () => {
    const views = plot.chart.views;
    expect(getSilbingViews(views[0]).length).toBe(1);
    expect(getSilbingViews(views[0])).toEqual([views[1]]);
  });

  afterAll(() => {
    plot.destroy();
  });
});
