import { Chart } from '@antv/g2';
import { findGeometry, getAllElements, getAllElementsRecursively } from '../../../src/utils';
import { createDiv } from '../../utils/dom';

const div = createDiv();

const DATA = [
  { x: 1, y: 1 },
  { x: 2, y: 2 },
];

describe('geometry', () => {
  it('findGeometry', () => {
    const chart = new Chart({
      container: div,
    });

    chart.data(DATA);

    const line = chart.line().position('x*y');
    const interval = chart.interval().position('x*y');

    expect(findGeometry(chart, 'line')).toBe(line);
    expect(findGeometry(chart, 'interval')).toBe(interval);
    expect(findGeometry(chart, 'point')).toBe(undefined);

    chart.destroy();
  });

  it('getAllElements', () => {
    const chart = new Chart({
      container: div,
    });

    chart.data(DATA);

    chart.line().position('x*y');
    chart.interval().position('x*y');

    chart.render();

    expect(getAllElements(chart).length).toBe(3);

    chart.destroy();
  });

  it('getAllElementsRecursively', () => {
    const chart = new Chart({
      container: div,
    });

    chart.data(DATA);

    chart.line().position('x*y');
    chart.interval().position('x*y');

    chart.render();

    expect(getAllElementsRecursively(chart).length).toBe(3);

    const childView = chart.createView();

    childView.data(DATA);

    childView.line().position('x*y');
    childView.interval().position('x*y');

    chart.render();

    expect(getAllElementsRecursively(chart).length).toBe(6);

    chart.destroy();
  });
});
