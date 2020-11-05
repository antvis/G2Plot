import { Chart } from '@antv/g2';
import { findGeometry } from '../../../src/utils';
import { createDiv } from '../../utils/dom';

const div = createDiv();

describe('geometry', () => {
  it('findGeometry', () => {
    const chart = new Chart({
      container: div,
    });

    chart.data([
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ]);

    const line = chart.line().position('x*y');
    const interval = chart.interval().position('x*y');

    expect(findGeometry(chart, 'line')).toBe(line);
    expect(findGeometry(chart, 'interval')).toBe(interval);
    expect(findGeometry(chart, 'point')).toBe(undefined);

    chart.destroy();
  });
});
