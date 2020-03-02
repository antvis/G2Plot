import { Line } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('CanvasController', () => {
  test('canvas', () => {
    const div = createDiv();
    // canvas
    const line = new Line(div, {
      width: 400,
      height: 400,
      data: [{ year: '2020', value: 100 }],
      xField: 'year',
      yField: 'value',
    });
    line.render();

    expect(div.querySelector('canvas')).toBeDefined();
    expect(div.querySelector('svg')).toBeNull();
  });

  test('svg', () => {
    const div = createDiv();
    // canvas
    const line = new Line(div, {
      width: 400,
      height: 400,
      data: [{ year: '2020', value: 100 }],
      xField: 'year',
      yField: 'value',
      renderer: 'svg',
    });
    line.render();

    expect(div.querySelector('svg')).toBeDefined();
    expect(div.querySelector('canvas')).toBeNull();
  });
});
