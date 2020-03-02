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

    expect(div.getElementsByTagName('canvas')).toBeDefined();
    expect(div.getElementsByTagName('svg')).not.toBeDefined();
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

    expect(div.getElementsByTagName('svg')).toBeDefined();
    expect(div.getElementsByTagName('canvas')).not.toBeDefined();
  });
});
