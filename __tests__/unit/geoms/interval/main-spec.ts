import { Column } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import sales from '../../../data/sales.json';
import { getGeometryShapes, getGeometryByType } from '../../../../src/util/view';

describe('Line Main', () => {
  it('line color /wo seriesField', () => {
    const plot = new Column(createDiv(), {
      data: sales,
      xField: 'area',
      yField: 'sales',
      color: ['red', 'yellow', 'blue'],
    });
    plot.render();
    const view = plot.getView();
    const intervals = getGeometryShapes(getGeometryByType(view, 'interval'));
    expect(intervals.length).toBe(sales.length);
    expect(intervals[0].attr('fill')).toBe('red');
  });
});
