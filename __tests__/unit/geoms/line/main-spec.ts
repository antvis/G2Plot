import { Line } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import sales from '../../../data/sales.json';
import { getGeometryShapes, getGeometryByType } from '../../../../src/util/view';

describe('Line Main', () => {
  it('line color /wo seriesField', () => {
    const plot = new Line(createDiv(), {
      data: sales,
      xField: 'area',
      yField: 'sales',
      color: ['red', 'yellow', 'blue'],
    });
    plot.render();
    const view = plot.getView();
    const lines = getGeometryShapes(getGeometryByType(view, 'line'));
    expect(lines.length).toBe(1);
    expect(lines[0].attr('stroke')).toBe('red');
  });
});
